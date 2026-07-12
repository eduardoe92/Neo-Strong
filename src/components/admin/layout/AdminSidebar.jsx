import { NavLink, useNavigate } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuPackage,
  LuShoppingCart,
  LuLogOut,
} from "react-icons/lu";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-black uppercase transition-all";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="hidden w-64 min-h-screen p-6 border-r border-gray-800 bg-strong md:flex md:flex-col md:justify-between">
      <div>
        <div className="mb-10 text-xl font-black text-white">
          ADMIN <span className="text-neos">PANEL</span>
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-neos text-black" : "text-gray-400 hover:text-white"}`
            }
          >
            <LuLayoutDashboard /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-neos text-black" : "text-gray-400 hover:text-white"}`
            }
          >
            <LuPackage /> Productos
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-neos text-black" : "text-gray-400 hover:text-white"}`
            }
          >
            <LuShoppingCart /> Pedidos
          </NavLink>
        </nav>
      </div>
      
      <button
        onClick={handleLogout}
        className="flex items-center w-full gap-3 px-4 py-3 text-gray-400 transition-all rounded-xl hover:text-red-400 hover:bg-gray-800/50"
      >
        <LuLogOut /> Cerrar Sesión
      </button>
    </aside>
  );
}