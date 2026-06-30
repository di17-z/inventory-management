import { LayoutDashboard, Package, ArrowLeftRight } from "lucide-react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <nav className="mt-8">
      <NavLink
        to="/"
        className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/products"
        className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
      >
        Products
      </NavLink>

      <NavLink
        to="/transactions"
        className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
      >
        Transactions
      </NavLink>

      <NavLink
        to="/users"
        className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
      >
        Users
      </NavLink>
    </nav>
  );
}
