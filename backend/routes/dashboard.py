from flask import Blueprint, jsonify
from database import products_collection, transactions_collection

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def get_dashboard():

    # 🧮 Total products
    total_products = products_collection.count_documents({})

    # 💰 Total inventory value
    products = list(products_collection.find())

    total_value = 0
    low_stock = []

    for p in products:
        quantity = p.get("quantity", 0)
        price = p.get("price", 0)

        total_value += quantity * price

        if quantity <= 5:
            low_stock.append({
                "sku": p.get("sku"),
                "name": p.get("name"),
                "quantity": quantity
            })

    # 📜 Recent transactions (last 5)
    recent_transactions_cursor = transactions_collection.find().sort("timestamp", -1).limit(5)

    recent_transactions = []

    for t in recent_transactions_cursor:
        t["_id"] = str(t["_id"])
        if "timestamp" in t and t["timestamp"]:
            t["timestamp"] = t["timestamp"].isoformat()
        recent_transactions.append(t)

    return jsonify({
        "success": True,
        "total_products": total_products,
        "total_inventory_value": total_value,
        "low_stock_items": low_stock,
        "recent_transactions": recent_transactions
    }), 200