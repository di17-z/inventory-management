import os
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    DATABASE_NAME = os.getenv("DATABASE_NAME")