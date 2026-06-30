import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from datetime import datetime
from bson import ObjectId
from database import products_collection
from routes.transactions import log_transaction

def update_stock(product_id, amount, operation):
    """
    operation: "INCREASE" or "DECREASE"
    """

    product = products_collection.find_one({"_id": ObjectId(product_id)})

    if not product:
        return None, "Product not found"

    current_qty = product["quantity"]

    if operation == "DECREASE" and current_qty < amount:
        return None, "Insufficient stock"

    new_quantity = current_qty + amount if operation == "INCREASE" else current_qty - amount

    products_collection.update_one(
        {"_id": ObjectId(product_id)},
        {
            "$set": {
                "quantity": new_quantity,
                "last_updated": datetime.utcnow()
            }
        }
    )

    # log transaction
    log_transaction(
        product_id,
        product["sku"],
        operation,
        amount,
        new_quantity
    )

    return new_quantity, None