# Inventory Management System

A full-stack Inventory Management System built with **React**, **Tailwind CSS**, **Flask**, and **MongoDB**. The application allows administrators to manage users, products, inventory levels, and stock transactions through a responsive web interface.

---

## Features

### User Management

- Register new users
- View all registered users
- Edit user information
- Delete users
- Server-side validation for user data

### Product Management

- Add new products
- Update existing products
- Delete products
- Search products by SKU or product name
- Inventory statistics dashboard

### Inventory Management

- Increase product stock
- Decrease product stock
- Prevent stock from dropping below zero
- Automatically update the last modified timestamp

### Dashboard

- Total products
- Inventory value
- Low-stock products
- Out-of-stock products
- Recent inventory transactions

### Transaction Ledger

- Logs every stock movement
- Records stock in/out operations
- Pagination support
- Timestamp for every transaction

---

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- React Router

### Backend

- Flask
- PyMongo
- Flask-CORS

### Database

- MongoDB

---

## Project Structure

```
inventory-management/
│
├── backend/
│   ├── routes/
│   ├── utils/
│   ├── app.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── README.md
└── Architecture.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/inventory-management.git
```

```
cd inventory-management
```

---

## Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

Windows

```bash
venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start the Flask server.

```bash
python app.py
```

The backend will run on

```
http://127.0.0.1:5000
```

---

## Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the React development server.

```bash
npm start
```

The frontend will run on

```
http://localhost:3000
```

---

## API Endpoints

### Users

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/users     | Get all users |
| POST   | /api/users     | Register user |
| PUT    | /api/users/:id | Update user   |
| DELETE | /api/users/:id | Delete user   |

### Products

| Method | Endpoint                   | Description    |
| ------ | -------------------------- | -------------- |
| GET    | /api/products              | Get products   |
| POST   | /api/products              | Create product |
| PUT    | /api/products/:id          | Update product |
| DELETE | /api/products/:id          | Delete product |
| PATCH  | /api/products/:id/increase | Increase stock |
| PATCH  | /api/products/:id/decrease | Decrease stock |

### Dashboard

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/dashboard |

### Transactions

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/transactions |

---

## Validation

The backend validates:

- Required fields
- Duplicate product SKU
- Duplicate user email
- Valid email format
- Stock cannot become negative
- Numeric values for price and quantity

---

## Future Improvements

- JWT Authentication
- Role-based authorization
- Product categories
- Barcode scanning
- Export inventory reports
- Email notifications
- Inventory analytics
- Dark mode

---

## Author

Developed as part of a Full Stack Inventory Management assignment using React, Flask, and MongoDB.
