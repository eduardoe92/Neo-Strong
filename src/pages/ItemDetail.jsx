import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuMinus, LuPlus, LuHeart } from "react-icons/lu";
import { productService } from "../services/productService.js";
import { cartService } from "../services/cartService.js";
import CartFeedback from "../components/shop/CartFeedback.jsx";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [enCarrito, setEnCarrito] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const stockDisponibleParaUsuario = Math.max(
    0,
    (item?.stock || 0) - enCarrito,
  );

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [productoData, carritoData] = await Promise.all([
          productService.getProductById(id),
          isLoggedIn ? cartService.getCart() : Promise.resolve([]),
        ]);

        setItem(productoData);

        const itemEnCarro = Array.isArray(carritoData)
          ? carritoData.find(
              (i) => String(i.productId || i.id || i.productoId) === String(id),
            )
          : null;

        const cantidadEnCarro = itemEnCarro ? itemEnCarro.cantidad : 0;
        setEnCarrito(cantidadEnCarro);

        if (isLoggedIn) {
          try {
            const favoritos = await productService.getFavorites();
            const existe =
              Array.isArray(favoritos) &&
              favoritos.some(
                (fav) =>
                  String(fav.id || fav.productId || fav.productoId) ===
                  String(id),
              );
            setIsFavorite(existe);
          } catch (favErr) {
            console.error("Error al cargar favoritos:", favErr.message);
          }
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) cargarDatos();
  }, [id, isLoggedIn]);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await cartService.addToCart(id, cantidad);
      window.dispatchEvent(new Event("cartUpdated"));

      // 1. Actualizamos el carrito localmente
      setEnCarrito((prev) => prev + cantidad);

      // 2. Calculamos el nuevo stock disponible tras la compra
      const nuevoDisponible = (item?.stock || 0) - (enCarrito + cantidad);

      // 3. Reseteamos la cantidad:
      // Si queda stock, la ponemos en 1, si no, la dejamos en 0.
      setCantidad(nuevoDisponible > 0 ? 1 : 0);

      setFeedback({
        isOpen: true,
        type: "success",
        message: "Producto agregado con éxito.",
      });
    } catch (err) {
      setFeedback({
        isOpen: true,
        type: "error",
        message:
          err.response?.data?.message || "No hay suficiente stock disponible.",
      });
    } finally {
      setAdding(false);
    }
  };

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para guardar favoritos.");
      return;
    }

    const estadoAnterior = isFavorite;
    try {
      setFavLoading(true);

      setIsFavorite(!estadoAnterior);

      if (estadoAnterior) {
        await productService.removeFavorite(id);
      } else {
        await productService.addFavorite(id);
      }

      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (err) {
      console.error("Error al mutar favorito:", err.message);
      setIsFavorite(estadoAnterior);
    } finally {
      setFavLoading(false);
    }
  };

  const incrementar = () => {
    if (cantidad < stockDisponibleParaUsuario) {
      setCantidad((prev) => prev + 1);
    }
  }

  const decrementar = () => {
    if (cantidad > 1) setCantidad((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="max-w-5xl px-4 py-20 mx-auto">
        <div className="flex flex-col gap-12 lg:flex-row animate-pulse">
          <div className="w-full border border-gray-400 h-96 bg-strong rounded-4xl lg:w-1/2" />
          <div className="flex-1 py-4 space-y-6">
            <div className="w-3/4 h-10 bg-strong rounded-xl" />
            <div className="w-1/4 h-8 bg-strong rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="py-20 space-y-4 text-center">
        <p className="text-xl font-bold text-gray-300">
          {error || "El producto no está disponible."}
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

  return (
    <div className="max-w-5xl px-4 py-6 mx-auto space-y-6 md:py-12 animate-slide-up">
      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-gray-400 bg-strong border border-gray-400 rounded-full transition-all duration-300 hover:text-neos hover:border-neos/30 hover:bg-fondo shadow-md cursor-pointer select-none"
        >
          <LuArrowLeft size={16} />
          <span>Volver al Catálogo</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-8 p-6 border shadow-2xl border-neos/20 bg-strong rounded-3xl md:p-10 lg:flex-row lg:items-center lg:gap-12 lg:rounded-4xl">
        <div className="relative flex items-center justify-center w-full max-w-sm p-6 overflow-hidden border h-fit border-neos/20 bg-fondo rounded-3xl lg:w-1/2 lg:max-w-md lg:mx-0 shrink-0">
          <img
            src={item.imagen}
            alt={item.nombre}
            className="w-auto h-auto max-w-full max-h-64 object-contain sm:max-h-80 lg:max-h-112.5 rounded-2xl"
          />

          <button
            onClick={toggleFavorite}
            disabled={favLoading}
            className={`absolute top-4 right-4 p-3 rounded-full border transition-all duration-300 cursor-pointer shadow-lg select-none ${
              !isLoggedIn
                ? "bg-fondo/40 border-gray-600 text-gray-500 opacity-60 cursor-not-allowed"
                : isFavorite
                  ? "bg-orange-500/20 border-orange-500 text-orange-500 scale-105"
                  : "bg-strong border-gray-500 text-gray-400 hover:text-neos hover:border-neos/30"
            }`}
            title={
              !isLoggedIn
                ? "Inicia sesión para guardar favoritos"
                : isFavorite
                  ? "Quitar de favoritos"
                  : "Guardar en favoritos"
            }
          >
            <LuHeart
              size={20}
              fill={isFavorite && isLoggedIn ? "#f97316" : "none"} // Relleno naranja tailwind nativo fijo
              stroke={isFavorite && isLoggedIn ? "#f97316" : "currentColor"}
              className={favLoading ? "animate-pulse" : ""}
            />
          </button>
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
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl ${stockCritico ? "bg-orange-500/10 border-orange-500/30 text-orange-400" : "bg-fondo border-gray-400/60 text-gray-400"}`}
              >
                <span>{stockCritico ? "¡Últimas unidades!" : "Stock:"}</span>
                <span>{item.stock} u.</span>
              </div>
            </div>

            <p className="text-xs font-medium leading-relaxed text-gray-400 md:text-sm">
              {item.descripcion}
            </p>
          </div>

          <div className="pt-4 space-y-4 lg:pt-6">
            {isLoggedIn ? (
              <>
                {stockDisponibleParaUsuario > 0 ? (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black tracking-wider text-gray-400 uppercase">
                        Unidades:
                      </span>
                      <div className="flex items-center p-1 border rounded-full shadow-inner border-gray-400/60 bg-fondo">
                        <button
                          onClick={decrementar}
                          disabled={cantidad <= 1 || adding}
                          className="flex items-center justify-center w-8 h-8 text-gray-400 rounded-full hover:text-neos disabled:opacity-20"
                        >
                          <LuMinus size={14} />
                        </button>
                        <span className="w-10 text-sm font-black text-center text-gray-100">
                          {cantidad}
                        </span>
                        <button
                          onClick={incrementar}
                          disabled={
                            cantidad >= stockDisponibleParaUsuario || adding
                          }
                          className="flex items-center justify-center w-8 h-8 text-gray-400 rounded-full hover:text-neos disabled:opacity-20"
                        >
                          <LuPlus size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={adding || cantidad > stockDisponibleParaUsuario}
                      className="w-full py-4 text-sm font-black uppercase tracking-wider text-white transition-all duration-300 rounded-full shadow-lg bg-neos hover:bg-orange-600 hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
                    >
                      {adding
                        ? "Agregando..."
                        : stockDisponibleParaUsuario > 0
                          ? `Agregar ${cantidad} al Carrito`
                          : "Sin Stock"}
                    </button>
                  </>
                ) : (
                  <div className="w-full py-4 text-sm font-black tracking-wider text-center text-orange-500 uppercase border rounded-full border-orange-500/30 bg-orange-500/10">
                    Sin Stock Disponible
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full py-4 text-sm font-black tracking-wider text-center text-gray-400 uppercase transition-all duration-300 border border-gray-500 border-dashed rounded-full bg-strong/50 hover:text-neos hover:border-neos/50"
              >
                Inicia sesión para comprar
              </Link>
            )}

            <CartFeedback
              isOpen={feedback.isOpen}
              type={feedback.type}
              message={feedback.message}
              onClose={() => setFeedback({ ...feedback, isOpen: false })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
