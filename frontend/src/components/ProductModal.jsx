import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/api";

export default function ProductModal({
  isOpen,
  onClose,
  onProductAdded,
  editingProduct,
}) {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        sku: editingProduct.sku || "",
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        quantity: editingProduct.quantity || "",
      });
    } else {
      setFormData({
        sku: "",
        name: "",
        price: "",
        quantity: "",
      });
    }
  }, [editingProduct, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;

    if (editingProduct) {
      result = await updateProduct(editingProduct._id, formData);
    } else {
      result = await createProduct(formData);
    }

    if (result.success) {
      alert(
        editingProduct
          ? "Product updated successfully!"
          : "Product added successfully!",
      );

      setFormData({
        sku: "",
        name: "",
        price: "",
        quantity: "",
      });

      onProductAdded();
      onClose();
    } else {
      alert(result.message || "Something went wrong.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>

          <p className="text-gray-500 mt-1">
            {editingProduct
              ? "Update the selected product."
              : "Create a new inventory product."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              SKU
            </label>

            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              {editingProduct ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
