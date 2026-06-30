import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getProducts,
  increaseStock,
  decreaseStock,
  deleteProduct,
} from "../services/api";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/ui/SearchBar";
import StatCard from "../components/ui/StatCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleIncrease = async (id) => {
    if (!window.confirm("Increase stock by 1?")) return;

    try {
      await increaseStock(id, 1);
      await loadProducts();
    } catch (error) {
      alert("Unable to increase stock.");
      console.error(error);
    }
  };

  const handleDecrease = async (id) => {
    if (!window.confirm("Decrease stock by 1?")) return;

    try {
      await decreaseStock(id, 1);
      await loadProducts();
    } catch (error) {
      alert("Unable to decrease stock.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await deleteProduct(id);

      if (response.success) {
        alert("Product deleted successfully.");
        await loadProducts();
      } else {
        alert(response.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the product.");
    }
  };

  // Open modal in Edit mode
  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;

      return 0;
    });
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity <= 5,
  ).length;

  const outOfStock = products.filter((p) => p.quantity === 0).length;

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Product Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your inventory efficiently
          </p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <div className="flex-1 lg:w-80">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg shadow"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Products" value={products.length} color="blue" />

        <StatCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          color="green"
        />

        <StatCard title="Low Stock" value={lowStock} color="yellow" />

        <StatCard title="Out of Stock" value={outOfStock} color="red" />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-gray-600 uppercase text-sm">
              <th className="p-4">#</th>
              <th
                onClick={() => handleSort("name")}
                className="p-4 cursor-pointer hover:bg-slate-200"
              >
                SKU{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              {/* <th className="p-4">Product</th> */}
              <th
                onClick={() => handleSort("name")}
                className="p-4 cursor-pointer hover:bg-slate-200"
              >
                Product{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>

              <th
                onClick={() => handleSort("name")}
                className="p-4 cursor-pointer hover:bg-slate-200"
              >
                Price{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                onClick={() => handleSort("name")}
                className="p-4 cursor-pointer hover:bg-slate-200"
              >
                Quantity{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-semibold">{index + 1}</td>

                  <td className="p-4 font-medium">{product.sku}</td>

                  <td className="p-4">{product.name}</td>

                  <td className="p-4 font-semibold text-green-600">
                    ${product.price}
                  </td>

                  <td className="p-4 font-bold">{product.quantity}</td>

                  <td className="p-4">
                    {product.quantity === 0 ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Out of Stock
                      </span>
                    ) : product.quantity <= 5 ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Low Stock
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => handleIncrease(product._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Stock In
                      </button>

                      <button
                        onClick={() => handleDecrease(product._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Stock Out
                      </button>

                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-gray-800 hover:bg-black text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-16 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={openModal}
        editingProduct={editingProduct}
        onClose={() => {
          setOpenModal(false);
          setEditingProduct(null);
        }}
        onProductAdded={loadProducts}
      />
    </MainLayout>
  );
}
