import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuShoppingCart, LuUser, LuMenu, LuX, LuHeart } from "react-icons/lu";
import { productService } from "../../../services/productService.js";
import { cartService } from "../../../services/cartService.js";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  const [userName, setUserName] = useState(() => {
    const nombreCompleto = localStorage.getItem("userName") || "Usuario";
    return nombreCompleto.split(" ")[0];
  });

  const [favCount, setFavCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const verificarSesion = useCallback(async () => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(logged);

    const nombreCompleto = localStorage.getItem("userName") || "Usuario";
    setUserName(nombreCompleto.split(" ")[0]);

    if (logged) {
      try {
        const [favoritos, carrito] = await Promise.all([
          productService.getFavorites().catch(() => ({ data: [] })),
          cartService.getCart().catch(() => ({ items: [] })),
        ]);

        const rawFavs = Array.isArray(favoritos)
          ? favoritos
          : favoritos.data || [];
        const listaFavs = rawFavs.filter(
          (item) => item.active === true || item.status === "active",
        );
        setFavCount(listaFavs.length);

        const rawCart = Array.isArray(carrito)
          ? carrito
          : carrito.items || carrito.cart || [];
        const listaItems = rawCart.filter(
          (item) => item.active === true || item.status === "active",
        );
        setCartCount(listaItems.length);
      } catch (err) {
        console.error("Error al actualizar:", err.message);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      verificarSesion();
    }, 0);

    window.addEventListener("storage", verificarSesion);
    window.addEventListener("favoritesUpdated", verificarSesion);
    window.addEventListener("cartUpdated", verificarSesion);
    window.addEventListener("loginSuccess", verificarSesion);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", verificarSesion);
      window.removeEventListener("favoritesUpdated", verificarSesion);
      window.removeEventListener("cartUpdated", verificarSesion);
      window.removeEventListener("loginSuccess", verificarSesion);
    };
  }, [verificarSesion]);

  const linkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-300 group tracking-wider uppercase text-sm font-semibold ${
      isActive ? "text-neos font-bold" : "text-gray-300 hover:text-neos"
    }`;

  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUserName("Usuario");
    setFavCount(0);
    setCartCount(0);
    cerrarMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 shadow-lg bg-fondo/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex flex-1">
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
        </div>

        <nav className="items-center justify-center hidden gap-8 md:flex">
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
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-neos transition-all duration-300 -translate-x-1/2 group-hover:w-full ${isActive ? "w-full" : "w-0"}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="items-center justify-end flex-1 hidden gap-6 text-gray-300 md:flex">
          {isLoggedIn && (
            <span className="pr-4 text-xs font-bold tracking-wider text-gray-400 uppercase border-r border-gray-700">
              Hola, <span className="text-neos">{userName}</span>
            </span>
          )}

          {isLoggedIn && (
            <>
              <Link
                to="/perfil"
                className="p-2 transition-colors hover:text-neos"
                title="Mi Perfil"
              >
                <LuUser size={24} />
              </Link>
              <Link
                to="/favoritos"
                className="relative p-2 transition-colors hover:text-neos group"
              >
                <div className="relative">
                  <LuHeart size={24} />
                  {favCount >= 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-neos rounded-full">
                      {favCount}
                    </span>
                  )}
                </div>
              </Link>
              <Link
                to="/carrito"
                className="relative p-2 transition-colors hover:text-neos group"
              >
                <div className="relative">
                  <LuShoppingCart size={24} />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-neos rounded-full">
                    {cartCount}
                  </span>
                </div>
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-100 uppercase transition-colors border border-gray-400 rounded-full cursor-pointer hover:bg-neos"
            >
              <LuX size={16} /> Salir
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-100 uppercase transition-colors border border-gray-400 rounded-full hover:bg-neos"
            >
              <LuUser size={16} /> Ingresar
            </Link>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="p-2 text-gray-300 cursor-pointer hover:text-neos"
          >
            {menuAbierto ? <LuX size={28} /> : <LuMenu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-gray-800 bg-fondo/95 backdrop-blur-lg ${
          menuAbierto
            ? "max-h-screem opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 px-6 py-6 pb-6">
          {isLoggedIn && (
            <div className="pb-2 border-b border-gray-800">
              <p className="mb-2 text-xs font-black tracking-widest text-gray-400 uppercase">
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
          <div className="flex flex-col gap-4 text-gray-300">
            {isLoggedIn && (
              <>
                <Link
                  to="/perfil"
                  onClick={cerrarMenu}
                  className="flex items-center gap-3 py-1 transition-colors hover:text-neos"
                >
                  <LuUser size={24} />
                  <span>Mi Perfil</span>
                </Link>
                <Link
                  to="/favoritos"
                  onClick={cerrarMenu}
                  className="flex items-center gap-3 py-1 transition-colors hover:text-neos"
                >
                  <div className="relative">
                    <LuHeart size={24} />
                    {favCount >= 0 && (
                      <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-neos rounded-full">
                        {favCount}
                      </span>
                    )}
                  </div>
                  <span>Favoritos</span>
                </Link>
                <Link
                  to="/carrito"
                  onClick={cerrarMenu}
                  className="flex items-center gap-3 py-1 transition-colors hover:text-neos"
                >
                  <div className="relative">
                    <LuShoppingCart size={24} />
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-neos rounded-full">
                      {cartCount}
                    </span>
                  </div>
                  <span>Carrito</span>
                </Link>
              </>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 text-xs font-bold uppercase border border-gray-400 rounded-full hover:bg-neos"
              >
                Salir
              </button>
            ) : (
              <Link
                to="/login"
                onClick={cerrarMenu}
                className="w-full py-3 text-xs font-bold text-center uppercase border border-gray-400 rounded-full hover:bg-neos"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
