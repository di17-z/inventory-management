# Inventory Management System Architecture

## Overview

The Inventory Management System is a full-stack web application designed to manage users, products, inventory, and stock transactions. The application follows a client-server architecture where the React frontend communicates with a RESTful Flask backend through HTTP APIs, while MongoDB stores persistent application data.

---

# System Architecture

```
                +----------------------+
                |    React Frontend    |
                |  (Tailwind CSS UI)   |
                +----------+-----------+
                           |
                    HTTP REST API
                           |
                           v
                +----------------------+
                |     Flask Backend    |
                | Business Logic/API   |
                +----------+-----------+
                           |
                      PyMongo Driver
                           |
                           v
                +----------------------+
                |      MongoDB         |
                |  Users, Products,    |
                |  Transactions        |
                +----------------------+
```

---

# Frontend Architecture

The frontend is developed using React and organized into reusable components.

```
src/
│
├── components/
│   ├── ui/
│   ├── ProductModal.jsx
│   └── UserModal.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── Users.jsx
│   └── Transactions.jsx
│
├── services/
│   └── api.js
│
└── App.jsx
```

### Responsibilities

- Display application data
- Handle user interactions
- Validate simple client-side inputs
- Call backend REST APIs using Axios
- Update UI dynamically after CRUD operations

---

# Backend Architecture

The backend is implemented using Flask and organized into modular route files.

```
backend/
│
├── routes/
│   ├── products.py
│   ├── users.py
│   ├── dashboard.py
│   └── transactions.py
│
├── database.py
├── app.py
└── requirements.txt
```

### Responsibilities

- Receive HTTP requests
- Validate incoming data
- Execute business logic
- Communicate with MongoDB
- Return JSON responses
- Handle errors gracefully

---

# Database Schema

## Users Collection

| Field     | Type     |
| --------- | -------- |
| \_id      | ObjectId |
| full_name | String   |
| email     | String   |

---

## Products Collection

| Field      | Type     |
| ---------- | -------- |
| \_id       | ObjectId |
| sku        | String   |
| name       | String   |
| price      | Number   |
| quantity   | Number   |
| updated_at | DateTime |

---

## Transactions Collection

| Field        | Type     |
| ------------ | -------- |
| \_id         | ObjectId |
| product_id   | ObjectId |
| sku          | String   |
| change_type  | String   |
| amount       | Number   |
| new_quantity | Number   |
| timestamp    | DateTime |

---

# REST API Design

The backend follows RESTful API principles.

## Users

| Method | Endpoint        | Purpose            |
| ------ | --------------- | ------------------ |
| GET    | /api/users      | Retrieve all users |
| POST   | /api/users      | Register user      |
| PUT    | /api/users/{id} | Update user        |
| DELETE | /api/users/{id} | Delete user        |

---

## Products

| Method | Endpoint                    | Purpose           |
| ------ | --------------------------- | ----------------- |
| GET    | /api/products               | Retrieve products |
| POST   | /api/products               | Create product    |
| PUT    | /api/products/{id}          | Update product    |
| DELETE | /api/products/{id}          | Delete product    |
| PATCH  | /api/products/{id}/increase | Increase stock    |
| PATCH  | /api/products/{id}/decrease | Decrease stock    |

---

## Dashboard

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/dashboard |

---

## Transactions

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/transactions |

---

# Validation

Server-side validation ensures data integrity.

### User Validation

- Required full name
- Required email
- Valid email format
- Duplicate email prevention

### Product Validation

- Required SKU
- Unique SKU
- Required product name
- Price must be positive
- Quantity cannot be negative

### Inventory Validation

- Prevent stock below zero
- Record every stock movement
- Automatically update timestamps

---

# Technical Trade-offs

## Why React?

React provides reusable components, efficient rendering, and excellent support for building responsive user interfaces.

## Why Flask?

Flask is lightweight, simple to structure, and ideal for REST API development without unnecessary complexity.

## Why MongoDB?

MongoDB offers flexible document storage, making it easy to evolve the schema during development and efficiently store products, users, and transaction records.

---

# Future Improvements

The current implementation satisfies the assignment requirements. Future enhancements could include:

- JWT authentication
- Role-based access control
- Product image uploads
- Barcode scanning
- Inventory reports
- Advanced filtering and sorting
- Dashboard charts and analytics
- Docker deployment
- Automated testing
- CI/CD pipeline
- Audit logging

---

# Design Summary

The system separates presentation, business logic, and data storage into distinct layers. This modular architecture improves maintainability, scalability, and readability while providing a clean RESTful interface between the frontend and backend.
