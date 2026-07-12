import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartService } from "../../services/cartService";
import { LuTrash2, LuShoppingCart, LuMinus, LuPlus } from "react-icons/lu";
import CarritoModal from "./CarritoModal";

const CarritoView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });
  const closeModal = () => setModal({ ...modal, isOpen: false });

  const fetchCart = async () => {
    try {
      const data = await cartService.getCart();
      const items = Array.isArray(data) ? data : data.items || [];
      setCartItems(items);
      setLoading(false);
    } catch {
      setCartItems([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await cartService.getCart();
        const itemsBrutos = Array.isArray(data) ? data : data.items || [];

        const itemsActivos = itemsBrutos.filter(
          (item) => item.active !== false,
        );

        if (isMounted) {
          setCartItems(itemsActivos);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setCartItems([]);
          setLoading(false);
        }
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    if (item.stock && newQuantity > item.stock) {
      setModal({
        isOpen: true,
        title: "Stock insuficiente",
        message: `Solo quedan ${item.stock} unidades disponibles.`,
      });
      return;
    }

    const id = item.productId || item.id || item._id;

    setCartItems((prev) =>
      prev.map((i) =>
        (i.productId || i.id || i._id) === id
          ? { ...i, quantity: newQuantity }
          : i,
      ),
    );

    try {
      await cartService.updateQuantity(id, newQuantity);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      fetchCart();
      setModal({
        isOpen: true,
        title: "Error",
        message:
          err.response?.data?.message || "No se pudo actualizar la cantidad.",
      });
    }
  };

  const handleRemove = async (item) => {
    const id = item.productId || item.id || item._id;

    setCartItems((prev) =>
      prev.filter((i) => (i.productId || i.id || i._id) !== id),
    );

    try {
      await cartService.removeItem(id);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      fetchCart();
      setModal({
        isOpen: true,
        title: "Error",
        message: "No se pudo eliminar el producto.",
      });
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center text-gray-400 animate-pulse">
        Cargando carrito...
      </div>
    );

  return (
    <div className="container max-w-5xl px-4 py-12 mx-auto animate-slide-up">
      <CarritoModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
      <h2 className="mb-8 text-3xl font-black text-center text-gray-100 uppercase">
        Tu{" "}
        <span className="text-transparent bg-linear-to-r from-neos to-orange-500 bg-clip-text">
          Carrito
        </span>
      </h2>

      {cartItems.length === 0 ? (
        <div className="p-10 space-y-4 text-center border border-gray-700 border-dashed bg-strong rounded-3xl">
          <div className="flex justify-center text-gray-600">
            <LuShoppingCart size={48} />
          </div>
          <p className="font-medium text-gray-400">Tu carrito está vacío.</p>
          <Link
            to="/productos"
            className="inline-block px-6 py-3 text-xs font-black tracking-wider text-white uppercase transition-colors rounded-full bg-neos hover:bg-orange-600"
          >
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-800 shadow-2xl rounded-3xl bg-strong">
          <div className="grid grid-cols-12 gap-2 p-4 text-[12px] font-black text-gray-500 uppercase border-b border-gray-800 bg-fondo/50">
            <div className="col-span-5">Producto</div>
            <div className="col-span-2 text-center">Cantidad</div>
            <div className="col-span-2 text-center">P. Unitario</div>
            <div className="col-span-2 text-center">Total</div>
            <div className="col-span-1 text-center">Acción</div>
          </div>

          {cartItems.map((item) => {
            const itemId = item.productId || item.id || item._id;
            return (
              <div
                key={itemId}
                className="grid items-center grid-cols-12 gap-2 p-4 transition-colors border-b border-gray-700/50 last:border-0 hover:bg-fondo/20"
              >
                <div className="flex items-center col-span-5 gap-4">
                  <img
                    src={item.imagen || item.image_url}
                    alt={item.name}
                    className="object-cover w-12 h-12 border border-gray-700 rounded-xl bg-fondo"
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                  <span className="text-base font-bold text-gray-200 uppercase truncate">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center justify-center col-span-2 gap-1">
                  <button
                    onClick={() => handleUpdate(item, item.quantity - 1)}
                    className="p-1 text-gray-400 transition-colors border border-gray-700 rounded-md hover:text-neos hover:border-neos/30"
                  >
                    <LuMinus size={12} />
                  </button>
                  <span className="w-6 text-base font-black text-center text-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleUpdate(item, item.quantity + 1)}
                    className="p-1 text-gray-400 transition-colors border border-gray-700 rounded-md hover:text-neos hover:border-neos/30"
                  >
                    <LuPlus size={12} />
                  </button>
                </div>
                <div className="col-span-2 font-mono text-base text-center text-gray-400 truncate">
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    maximumFractionDigits: 0,
                  }).format(item.price)}
                </div>

                <div className="col-span-2 font-mono font-black text-center truncate text-neos">
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    maximumFractionDigits: 0,
                  }).format(item.price * item.quantity)}
                </div>

                <div className="flex justify-center col-span-1">
                  <button
                    onClick={() => handleRemove(item)}
                    className="p-2 text-gray-500 transition-colors border border-gray-700 cursor-pointer hover:text-red-400 bg-fondo hover:border-red-900/40 rounded-xl"
                  >
                    <LuTrash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-4 p-6 border-t border-gray-800 bg-fondo/50 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between w-full md:justify-start md:gap-8">
              <p className="text-sm font-bold text-gray-400 uppercase">
                Total a pagar:
              </p>
              <p className="text-2xl font-black text-neos">
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  maximumFractionDigits: 0,
                }).format(
                  cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  ),
                )}
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full px-8 py-3 text-sm font-black text-white uppercase transition-all rounded-full md:w-auto bg-linear-to-r from-neos to-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-neos/20"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoView;
