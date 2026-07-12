import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuPackage,
  LuShoppingCart,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const iconSize = 22;
  const linkClass =
    "flex items-center gap-4 px-5 py-4 rounded-xl font-bold uppercase transition-all duration-300 ease-in-out group";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinksContent = (
    <nav className="flex flex-col gap-2">
      {[
        { to: "/admin", icon: LuLayoutDashboard, label: "Dashboard" },
        { to: "/admin/products", icon: LuPackage, label: "Productos" },
        { to: "/admin/orders", icon: LuShoppingCart, label: "Pedidos" },
      ].map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/admin"}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-neos text-black shadow-lg shadow-neos/20 scale-[1.02]"
                : "text-gray-400 hover:text-white hover:bg-gray-800/40"
            }`
          }
        >
          <Icon size={iconSize} /> {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      <button
        className="fixed z-50 p-4 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LuX size={28} /> : <LuMenu size={28} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 p-6 border-r border-gray-800 bg-strong shadow-2xl transition-all duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-2 mt-16 mb-12 md:mt-0">
            <img
              src="/logo.webp"
              alt="NEO-STRONG Logo"
              className="object-contain h-16 transition-transform duration-300 hover:scale-105"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h1 className="text-2xl font-black tracking-wider text-white">
              ADMIN <span className="text-neos">PANEL</span>
            </h1>
          </div>

          <div className="flex-1">{navLinksContent}</div>

          <div className="pt-6 mt-auto border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-2 px-5 py-4 font-bold text-gray-400 uppercase transition-all rounded-xl hover:text-red-400 hover:bg-red-500/10"
            >
              <LuLogOut size={iconSize} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
