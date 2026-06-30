import { useState, useEffect } from "react";
import { createUser, updateUser } from "../services/api";

export default function UserModal({
  isOpen,
  onClose,
  editingUser,
  onUserAdded,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        full_name: editingUser.full_name,
        email: editingUser.email,
      });
    } else {
      setFormData({
        full_name: "",
        email: "",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;

    if (editingUser) {
      res = await updateUser(editingUser._id, formData);
    } else {
      res = await createUser(formData);
    }

    if (res.success) {
      alert(
        editingUser
          ? "User updated successfully."
          : "User created successfully.",
      );

      onUserAdded();
      onClose();
    } else {
      alert(res.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[500px] p-8">
        <h2 className="text-2xl font-bold mb-6">
          {editingUser ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="full_name"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg p-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              {editingUser ? "Update User" : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
