export default function StatCard({ title, value, color = "blue" }) {
  const colors = {
    blue: "border-blue-500 text-blue-600",
    green: "border-green-500 text-green-600",
    red: "border-red-500 text-red-600",
    yellow: "border-yellow-500 text-yellow-600",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow border-l-4 ${colors[color]} p-6 hover:shadow-lg transition`}
    >
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
