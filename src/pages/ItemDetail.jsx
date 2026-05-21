import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuMinus, LuPlus } from "react-icons/lu";
import useFetch from "../hooks/useFetch.js";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productos, loading } = useFetch("/data/productos.json");
  
  const [cantidad, setCantidad] = useState(1);

  if (loading || !productos) {
    return (
      <div className="max-w-5xl px-4 py-20 mx-auto">
        <div className="flex flex-col gap-12 lg:flex-row animate-pulse">
          <div className="w-full border border-gray-400 h-96 bg-strong rounded-4xl lg:w-1/2" />
          <div className="flex-1 py-4 space-y-6">
            <div className="w-3/4 h-10 bg-strong rounded-xl" />
            <div className="w-1/4 h-8 bg-strong rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 rounded-md bg-strong" />
              <div className="h-4 rounded-md bg-strong" />
              <div className="w-5/6 h-4 rounded-md bg-strong" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const item = productos.find((p) => p.id === parseInt(id));

  if (!item) {
    return (
      <div className="py-20 space-y-4 text-center">
        <p className="text-xl font-bold text-gray-300">
          El producto solicitado no está disponible.
        </p>
        <Link
          to="/productos"
          className="inline-block text-sm font-black uppercase text-neos hover:underline"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(item.precio);

  const stockCritico = item.stock <= 5;

  const incrementar = () => {
    if (cantidad < item.stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className="max-w-5xl px-4 py-6 mx-auto space-y-6 md:py-12 animate-slide-up">
      
      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-gray-400 bg-strong border border-gray-400 rounded-full transition-all duration-300 hover:text-neos hover:border-neos/30/60 hover:bg-fondo shadow-md cursor-pointer select-none"
        >
          <LuArrowLeft size={16} />
          <span>Volver al Catálogo</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-8 p-6 border shadow-2xl border-neos/20 bg-strong rounded-3xl md:p-10 lg:flex-row lg:items-center lg:gap-12 lg:rounded-4xl">
        
        <div className="flex items-center justify-center w-full max-w-sm p-6 overflow-hidden border h-fit border-neos/20 bg-fondo rounded-3xl lg:w-1/2 lg:max-w-md lg:mx-0 shrink-0">
          <img
            src={item.imagen}
            alt={item.nombre}
            className="w-auto h-auto max-w-full max-h-64 object-contain sm:max-h-80 lg:max-h-112.5 rounded-2xl"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 w-full min-w-0 space-y-5 lg:space-y-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full gap-2">
              <span className="inline-block px-3 py-1 text-[11px] font-black uppercase tracking-widest text-neos bg-neos/10 border border-neos/20 rounded-md">
                {item.categoria}
              </span>
              {item.marca && (
                <span className="inline-block px-3 py-1 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-fondo border border-gray-400/50 rounded-md">
                  {item.marca}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-black leading-tight tracking-tight text-gray-100 uppercase md:text-3xl lg:text-4xl">
              {item.nombre}
            </h1>

            <p className="text-3xl font-black tracking-tight text-neos bg-clip-text lg:text-4xl">
              {precioFormateado}
            </p>

            <div className="w-full h-px bg-gray-400/60" />

            <div className="flex items-center justify-between w-full gap-4 text-[10px] font-black uppercase tracking-wider">
              {item.cantidad && (
                <div className="flex items-center gap-2 px-3 py-2 text-gray-400 border bg-fondo border-gray-400/60 rounded-xl">
                  <span>Cont:</span>
                  <span className="text-gray-100">{item.cantidad}</span>
                </div>
              )}

              <div
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors duration-300 ${
                  stockCritico
                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400 animate-pulse"
                    : "bg-fondo border-gray-400/60 text-gray-400"
                }`}
              >
                <span>{stockCritico ? "¡Últimas unidades!" : "Stock:"}</span>
                <span className={stockCritico ? "text-orange-300" : "text-gray-100"}>
                  {item.stock} u.
                </span>
              </div>
            </div>

            <p className="text-xs font-medium leading-relaxed text-gray-400 md:text-sm">
              {item.descripcion}
            </p>
          </div>

          <div className="pt-4 space-y-4 lg:pt-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black tracking-wider text-gray-400 uppercase">
                Unidades:
              </span>
              
              <div className="flex items-center p-1 border rounded-full shadow-inner select-none border-gray-400/60 bg-fondo">
                <button
                  onClick={decrementar}
                  disabled={cantidad <= 1}
                  className="flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 rounded-full cursor-pointer hover:text-neos hover:bg-strong active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                >
                  <LuMinus size={14} />
                </button>
                
                <span className="w-10 text-sm font-black text-center text-gray-100">
                  {cantidad}
                </span>
                
                <button
                  onClick={incrementar}
                  disabled={cantidad >= item.stock}
                  className="flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 rounded-full cursor-pointer hover:text-neos hover:bg-strong active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                >
                  <LuPlus size={14} />
                </button>
              </div>
            </div>

            <button className="w-full py-4 text-sm font-black uppercase tracking-wider text-white transition-all duration-300 rounded-full shadow-lg bg-neos hover:bg-orange-600 hover:shadow-neos/20 hover:scale-[1.01] active:scale-98 cursor-pointer">
              Agregar al Carrito
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ItemDetail;