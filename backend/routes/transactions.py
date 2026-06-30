from flask import Blueprint, request, jsonify
from database import transactions_collection
from datetime import datetime
transactions_bp = Blueprint("transactions", __name__)


@transactions_bp.route("/transactions", methods=["GET"])
def get_transactions():

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    skip = (page - 1) * limit

    cursor = transactions_collection.find().sort("timestamp", -1).skip(skip).limit(limit)

    transactions = []

    for t in cursor:

        t["_id"] = str(t["_id"])

        # safe timestamp handling
        if "timestamp" in t and t["timestamp"]:
            t["timestamp"] = t["timestamp"].isoformat()
        else:
            t["timestamp"] = None

        transactions.append(t)

    total = transactions_collection.count_documents({})

    return jsonify({
        "success": True,
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit,
        "data": transactions
    }), 200
def log_transaction(product_id, sku, change_type, amount, new_quantity):

    transaction = {
        "product_id": str(product_id),
        "sku": sku,
        "change_type": change_type,
        "amount": amount,
        "new_quantity": new_quantity,
        "timestamp": datetime.utcnow()
    }

    transactions_collection.insert_one(transaction)