import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuShoppingCart, LuUser, LuMenu, LuX } from "react-icons/lu";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    const verificarSesion = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUserName(localStorage.getItem("userName") || "");
    };

    window.addEventListener("storage", verificarSesion);
    
    const interval = setInterval(verificarSesion, 500);

    return () => {
      window.removeEventListener("storage", verificarSesion);
      clearInterval(interval);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-300 group tracking-wider uppercase text-sm font-semibold ${
      isActive ? "text-neos font-bold" : "text-gray-300 hover:text-neos"
    }`;

  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    
    setIsLoggedIn(false);
    setUserName("");
    
    cerrarMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 shadow-lg bg-fondo/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={cerrarMenu}
        >
          <img
            src="/logo.webp"
            alt="NEO-STRONG Logo"
            className="object-contain h-20 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="text-2xl font-black tracking-tighter text-transparent uppercase bg-clip-text bg-linear-to-r from-neos to-orange-500">
            NEO-STRONG
          </span>
        </Link>

        <nav className="items-center hidden gap-8 md:flex">
          {[
            { to: "/", label: "Inicio" },
            { to: "/productos", label: "Tienda" },
            { to: "/contacto", label: "Contacto" },
          ].map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`
                    absolute bottom-0 left-1/2 h-0.5 bg-neos transition-all duration-300 -translate-x-1/2
                    group-hover:w-full 
                    ${isActive ? "w-full" : "w-0"}
                  `}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="items-center hidden gap-6 text-gray-300 md:flex">
          {isLoggedIn && (
            <span className="pr-4 text-xs font-bold tracking-wider text-gray-400 uppercase border-r border-gray-700">
              Hola, <span className="text-neos">{userName}</span>
            </span>
          )}

          <Link
            to="/carrito"
            className="relative p-2 transition-colors hover:text-neos group"
          >
            <LuShoppingCart
              size={24}
              className="transition-transform group-hover:scale-110"
            />
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-neos rounded-full animate-pulse">
              0
            </span>
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-100 uppercase border border-gray-400 rounded-full bg-strong hover:bg-neos hover:border-neos/30"
            >
              <LuX size={16} />
              <span>Salir</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-100 uppercase border border-gray-400 rounded-full bg-strong hover:bg-neos hover:border-neos/30"
            >
              <LuUser size={16} />
              <span>Ingresar</span>
            </Link>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="p-2 text-gray-300 transition-colors cursor-pointer hover:text-neos focus:outline-hidden"
            aria-label="Toggle Menu"
          >
            {menuAbierto ? <LuX size={28} /> : <LuMenu size={28} />}
          </button>
        </div>
        
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-gray-800 bg-fondo/95 backdrop-blur-lg ${
          menuAbierto
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 px-6 py-6">
          {isLoggedIn && (
            <div className="pb-2 border-b border-gray-800">
              <p className="mb-4 text-xs font-black tracking-widest text-gray-400 uppercase">
                Bienvenido, <span className="text-neos">{userName}</span>
              </p>
            </div>
          )}

          <nav className="flex flex-col gap-4">
            {[
              { to: "/", label: "Inicio" },
              { to: "/productos", label: "Tienda" },
              { to: "/contacto", label: "Contacto" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={cerrarMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="w-full h-px my-1 bg-gray-800" />

          <div className="flex items-center justify-between gap-4 text-gray-300">
            <Link
              to="/carrito"
              onClick={cerrarMenu}
              className="relative flex items-center gap-3 px-2 py-1 transition-colors hover:text-neos group"
            >
              <div className="relative">
                <LuShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-neos rounded-full">
                  0
                </span>
              </div>
              <span className="text-sm font-semibold tracking-wider uppercase">
                Carrito
              </span>
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-gray-100 uppercase transition-all border border-gray-400 rounded-full bg-strong hover:bg-neos hover:border-neos/30"
              >
                <LuX size={16} />
                <span>Salir</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={cerrarMenu}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-gray-100 uppercase transition-all border border-gray-400 rounded-full bg-strong hover:bg-neos hover:border-neos/30"
              >
                <LuUser size={16} />
                <span>Ingresar</span>
              </Link>
            )}
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;