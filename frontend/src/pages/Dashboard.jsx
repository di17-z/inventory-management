import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const res = await getDashboard();
    setData(res);
  };

  if (!data) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <MainLayout>
      <div className="p-2">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Inventory Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview of your inventory and recent stock activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {data.total_products}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Inventory Value</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              ${data.total_inventory_value}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Low Stock Items</p>
            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {data.low_stock_items.length}
            </h2>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Low Stock */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-5">⚠️ Low Stock Alerts</h2>

            {data.low_stock_items.length === 0 ? (
              <div className="text-center text-green-600 py-10">
                🎉 All products are sufficiently stocked.
              </div>
            ) : (
              <div className="space-y-3">
                {data.low_stock_items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center bg-red-50 rounded-lg p-4"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.sku}</p>
                    </div>

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-5">
              📦 Recent Transactions
            </h2>

            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {data.recent_transactions.map((t) => (
                <div
                  key={t._id}
                  className="border rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{t.sku}</h3>

                      <p className="text-gray-500 text-sm">{t.change_type}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">{t.amount}</p>

                      <p className="text-sm text-gray-500">
                        Stock: {t.new_quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
