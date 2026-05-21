import { Link } from "react-router-dom";
import { LuLock, LuShoppingCart } from "react-icons/lu";

const CarritoView = () => {
  const estaLogueado = false;

  if (!estaLogueado) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4 bg-fondo">
        <div className="w-full max-w-lg p-10 text-center border border-gray-800 shadow-xl bg-fondo/40 backdrop-blur-md rounded-3xl">
          <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6 text-gray-400 rounded-full bg-gray-800/50">
            <LuShoppingCart size={36} />
            <div className="absolute bottom-0 right-0 p-1.5 bg-neos rounded-full text-white shadow-md">
              <LuLock size={14} />
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-black tracking-tight text-gray-100 uppercase">
            Tu carrito está esperando
          </h2>
          
          <p className="max-w-sm mx-auto mb-8 text-sm leading-relaxed text-gray-400">
            Para poder guardar tus suplementos, accesorios de fuerza y gestionar tu pedido personalizado, necesitás iniciar sesión en la plataforma.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-black text-gray-100 uppercase tracking-widest bg-neos hover:bg-orange-600 rounded-full transition-all shadow-lg shadow-neos/10"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/productos"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-black text-gray-400 uppercase tracking-widest border border-gray-700 hover:border-gray-500 hover:text-gray-200 rounded-full transition-all"
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 text-center text-gray-100">
      <h2>Tu Carrito de Compras Activo</h2>
    </div>
  );
};

export default CarritoView;