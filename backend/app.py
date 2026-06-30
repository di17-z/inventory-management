from flask import Flask, jsonify
from flask_cors import CORS
from database import db
from routes.products import products_bp
from routes.transactions import transactions_bp
from routes.users import users_bp
from routes.dashboard import dashboard_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(users_bp, url_prefix="/api")
app.register_blueprint(products_bp, url_prefix="/api")
app.register_blueprint(transactions_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")

@app.route("/")
def home():
    try:
        db.command("ping")

        return jsonify({
            "success": True,
            "message": "Inventory Management API",
            "database": "Connected Successfully"
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)