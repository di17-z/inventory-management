from pymongo import MongoClient
from config import Config

# Create MongoDB client
client = MongoClient(Config.MONGO_URI)

# Select database
db = client[Config.DATABASE_NAME]

# Collections
users_collection = db["users"]
products_collection = db["products"]
transactions_collection = db["transactions"]