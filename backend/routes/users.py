from flask import Blueprint, request, jsonify
from bson import ObjectId
from email_validator import validate_email, EmailNotValidError
from database import users_collection

users_bp = Blueprint("users", __name__)


@users_bp.route("/users", methods=["POST"])
def register_user():
    data = request.get_json()

    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()

    if not full_name:
        return jsonify({
            "success": False,
            "message": "Full name is required."
        }), 400

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required."
        }), 400

    try:
        validate_email(email)
    except EmailNotValidError as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 400

    if users_collection.find_one({"email": email}):
        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 409

    result = users_collection.insert_one({
        "full_name": full_name,
        "email": email
    })

    return jsonify({
        "success": True,
        "message": "User registered successfully.",
        "user_id": str(result.inserted_id)
    }), 201
@users_bp.route("/users", methods=["GET"])
def get_users():
    users = []

    for user in users_collection.find():
        user["_id"] = str(user["_id"])
        users.append(user)

    return jsonify(users), 200
@users_bp.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)})

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    user["_id"] = str(user["_id"])

    return jsonify(user), 200
@users_bp.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()

    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()

    if not full_name:
        return jsonify({
            "success": False,
            "message": "Full name is required."
        }), 400

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required."
        }), 400

    try:
        validate_email(email)
    except EmailNotValidError as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 400

    existing = users_collection.find_one({
        "email": email,
        "_id": {"$ne": ObjectId(user_id)}
    })

    if existing:
        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 409

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$set": {
                "full_name": full_name,
                "email": email
            }
        }
    )

    return jsonify({
        "success": True,
        "message": "User updated successfully."
    }), 200
@users_bp.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    result = users_collection.delete_one({
        "_id": ObjectId(user_id)
    })

    if result.deleted_count == 0:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    return jsonify({
        "success": True,
        "message": "User deleted successfully."
    }), 200