import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8">
      <h2 className="text-2xl font-bold">Inventory Dashboard</h2>

      <div className="flex items-center gap-6">
        <Search />

        <Bell />

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}
