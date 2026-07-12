import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";

export default function AdminLayout() {
  const [menuMovil, setMenuMovil] = useState(false);

  return (
    <div className="flex min-h-screen text-gray-200 bg-fondo">
      {/* Botón hamburguesa solo visible en móvil */}
      <button 
        className="fixed z-50 p-4 text-white md:hidden"
        onClick={() => setMenuMovil(!menuMovil)}
      >
        {menuMovil ? <LuX size={28} /> : <LuMenu size={28} />}
      </button>

      {/* Contenedor del Sidebar */}
      <div className={`${menuMovil ? "block fixed inset-0 z-40 bg-fondo" : "hidden"} md:block`}>
        <AdminSidebar />
      </div>

      {/* Contenido principal */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-8 mt-12 md:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}