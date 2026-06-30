export default function Button({
  children,
  onClick,
  color = "blue",
  type = "button",
}) {
  const styles = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[color]} text-white px-4 py-2 rounded-lg transition shadow`}
    >
      {children}
    </button>
  );
}
