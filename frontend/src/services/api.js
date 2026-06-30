import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

// Dashboard
export const getDashboard = async () => (await API.get("/dashboard")).data;

// Products
export const getProducts = async () => (await API.get("/products")).data;

export const createProduct = async (data) =>
  (await API.post("/products", data)).data;

export const updateProduct = async (id, product) =>
  (await API.put(`/products/${id}`, product)).data;

export const deleteProduct = async (id) =>
  (await API.delete(`/products/${id}`)).data;

// Stock
export const increaseStock = async (id, amount) =>
  (
    await API.patch(`/products/${id}/increase`, {
      amount,
    })
  ).data;

export const decreaseStock = async (id, amount) =>
  (
    await API.patch(`/products/${id}/decrease`, {
      amount,
    })
  ).data;

// Transactions
export const getTransactions = async (page = 1) =>
  (await API.get(`/transactions?page=${page}&limit=10`)).data;
// USERS API

export const getUsers = async () => (await API.get("/users")).data;

export const createUser = async (user) => (await API.post("/users", user)).data;

export const updateUser = async (id, user) =>
  (await API.put(`/users/${id}`, user)).data;

export const deleteUser = async (id) => (await API.delete(`/users/${id}`)).data;
