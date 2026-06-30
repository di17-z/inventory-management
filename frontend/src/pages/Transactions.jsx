import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getTransactions } from "../services/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadTransactions(page);
  }, [page]);

  const loadTransactions = async (currentPage) => {
    const data = await getTransactions(currentPage);

    setTransactions(data.data);
    setTotalPages(data.total_pages);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>

          <p className="text-gray-500">Inventory movement history</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">SKU</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">New Stock</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{transaction.sku}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      transaction.change_type === "INCREASE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.change_type}
                  </span>
                </td>

                <td className="p-4">{transaction.amount}</td>

                <td className="p-4">{transaction.new_quantity}</td>

                <td className="p-4">
                  {new Date(transaction.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex justify-end mt-6 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="flex items-center">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
}
