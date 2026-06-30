import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getUsers, deleteUser } from "../services/api";
import UserModal from "../components/UserModal";
import SearchBar from "../components/ui/SearchBar";
import StatCard from "../components/ui/StatCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    const res = await deleteUser(id);

    if (res.success) {
      alert("User deleted.");
      loadUsers();
    } else {
      alert(res.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>

          <p className="text-gray-500">Manage system users</p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add User
        </button>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Total Users" value={users.length} color="blue" />

        <StatCard title="Showing" value={filteredUsers.length} color="green" />
      </div>

      {/* Search */}

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
        />
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">#</th>

              <th className="p-4 text-left">Full Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-medium">{user.full_name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        editingUser={editingUser}
        onUserAdded={loadUsers}
      />
    </MainLayout>
  );
}
