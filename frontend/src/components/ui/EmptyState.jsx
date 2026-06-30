export default function EmptyState({ title, subtitle }) {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
}
