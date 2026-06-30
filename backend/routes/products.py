from flask import Blueprint, request, jsonify
from database import products_collection
from datetime import datetime
from bson import ObjectId
from utils.inventory import update_stock

products_bp = Blueprint("products", __name__)


@products_bp.route("/products", methods=["POST"])
def create_product():

    data = request.get_json()

    sku = data.get("sku", "").strip().upper()
    name = data.get("name", "").strip()
    price = data.get("price")
    quantity = data.get("quantity")

    if not sku or not name:
        return jsonify({
            "success": False,
            "message": "SKU and product name are required."
        }), 400

    if price is None or float(price) <= 0:
        return jsonify({
            "success": False,
            "message": "Price must be greater than zero."
        }), 400

    if quantity is None or int(quantity) < 0:
        return jsonify({
            "success": False,
            "message": "Quantity cannot be negative."
        }), 400

    if products_collection.find_one({"sku": sku}):
        return jsonify({
            "success": False,
            "message": "SKU already exists."
        }), 409

    product = {
        "sku": sku,
        "name": name,
        "price": float(price),
        "quantity": int(quantity),
        "last_updated": datetime.utcnow()
    }

    result = products_collection.insert_one(product)

    return jsonify({
        "success": True,
        "message": "Product created successfully.",
        "product_id": str(result.inserted_id)
    }), 201
@products_bp.route("/products", methods=["GET"])
def get_products():

    products = []

    for product in products_collection.find():

        product["_id"] = str(product["_id"])

        # FIX: safely handle missing last_updated field
        if "last_updated" in product and product["last_updated"]:
            product["last_updated"] = product["last_updated"].isoformat()
        else:
            product["last_updated"] = None

        products.append(product)

    return jsonify(products), 200
@products_bp.route("/products/<product_id>/increase", methods=["PATCH"])
def increase_stock(product_id):

    data = request.get_json()
    amount = data.get("amount", 0)

    if amount <= 0:
        return jsonify({
            "success": False,
            "message": "Amount must be greater than zero"
        }), 400

    new_quantity, error = update_stock(product_id, amount, "INCREASE")

    if error:
        return jsonify({"success": False, "message": error}), 400

    return jsonify({
        "success": True,
        "message": "Stock increased successfully",
        "new_quantity": new_quantity
    }), 200
@products_bp.route("/products/<product_id>/decrease", methods=["PATCH"])
def decrease_stock(product_id):

    data = request.get_json()
    amount = data.get("amount", 0)

    if amount <= 0:
        return jsonify({
            "success": False,
            "message": "Amount must be greater than zero"
        }), 400

    new_quantity, error = update_stock(product_id, amount, "DECREASE")

    if error:
        return jsonify({"success": False, "message": error}), 400

    return jsonify({
        "success": True,
        "message": "Stock decreased successfully",
        "new_quantity": new_quantity
    }), 200
@products_bp.route("/products/<product_id>", methods=["PUT"])
def update_product(product_id):

    data = request.get_json()

    result = products_collection.update_one(
        {"_id": ObjectId(product_id)},
        {
            "$set": {
                "sku": data["sku"],
                "name": data["name"],
                "price": float(data["price"]),
                "quantity": int(data["quantity"]),
                "last_updated": datetime.utcnow()
            }
        }
    )

    if result.modified_count == 0:
        return jsonify({
            "success": False,
            "message": "Nothing updated"
        }),400

    return jsonify({
        "success": True,
        "message":"Product updated successfully"
    })
@products_bp.route("/products/<product_id>", methods=["DELETE"])
def delete_product(product_id):

    result = products_collection.delete_one(
        {"_id": ObjectId(product_id)}
    )

    if result.deleted_count == 0:
        return jsonify({
            "success":False,
            "message":"Product not found"
        }),404

    return jsonify({
        "success":True,
        "message":"Deleted successfully"
    })
