import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuTrash2, LuEye, LuHeartOff } from "react-icons/lu";
import { productService } from "../../services/productService.js";

const FavoritesView = () => {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        setLoading(true);
        const data = await productService.getFavorites();
        const favsBrutos = Array.isArray(data)
          ? data
          : data.items || data.data || [];
        const filtrados = favsBrutos.filter((item) => {
          return item.active === true;
        });

        console.log("Total favoritos originales:", favsBrutos.length);
        console.log("Total favoritos activos:", filtrados.length);

        setFavs(filtrados);
      } catch (err) {
        console.error("Error al cargar:", err);
        setFavs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, []);

  const removeFav = async (id) => {
    try {
      await productService.removeFavorite(id);
      setFavs((prev) =>
        prev.filter((item) => {
          const itemId = item.productId || item.id || item._id;
          return itemId !== id;
        }),
      );
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="container px-4 py-20 mx-auto text-center animate-pulse">
        <div className="w-48 h-8 mx-auto mb-6 bg-strong rounded-xl" />
        <div className="h-32 max-w-md mx-auto bg-strong rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto animate-slide-up">
      <h2 className="mb-8 text-3xl font-black tracking-tighter text-center text-gray-100 uppercase">
        Mis{" "}
        <span className="text-transparent bg-linear-to-r from-neos to-orange-500 bg-clip-text">
          Favoritos
        </span>
      </h2>

      {favs.length === 0 ? (
        <div className="p-10 space-y-4 text-center border border-gray-700 border-dashed bg-strong rounded-3xl">
          <div className="flex justify-center text-gray-600">
            <LuHeartOff size={48} />
          </div>
          <p className="font-medium text-gray-400">
            Aún no has guardado ningún artículo de Neo Strong o tu sesión
            expiró.
          </p>
          <Link
            to="/productos"
            className="inline-block px-6 py-3 text-xs font-black tracking-wider text-white uppercase transition-colors rounded-full bg-neos hover:bg-orange-600"
          >
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {favs.map((prod) => {
            console.log("Producto en favoritos:", prod);
            const productoId = prod.productId || prod.id;
            const precioFinal = prod.precio || prod.price || 0;

            return (
              <div
                key={productoId}
                className="flex items-center gap-4 p-4 border shadow-md border-neos/20 bg-strong rounded-2xl"
              >
                <img
                  src={prod.imagen || prod.image_url}
                  alt={prod.nombre || prod.name}
                  className="object-contain w-20 h-20 p-1 border border-gray-700 bg-fondo rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-gray-200 uppercase truncate">
                    {prod.nombre || prod.name}
                  </h4>
                  <p className="mb-1 text-xs tracking-wider text-gray-400 uppercase">
                    {prod.marca || prod.brand || "Genérico"}
                  </p>
                  <p className="text-base font-black text-neos">
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      maximumFractionDigits: 0,
                    }).format(precioFinal)}
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <Link
                    to={`/item/${productoId}`}
                    className="p-2 text-gray-400 transition-colors border border-gray-700 hover:text-neos bg-fondo hover:border-neos/40 rounded-xl"
                    title="Ver detalle"
                  >
                    <LuEye size={16} />
                  </Link>
                  <button
                    onClick={() => removeFav(productoId)}
                    className="p-2 text-gray-500 transition-colors border border-gray-700 cursor-pointer hover:text-red-400 bg-fondo hover:border-red-900/40 rounded-xl"
                    title="Eliminar"
                  >
                    <LuTrash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
