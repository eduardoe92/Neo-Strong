import { Link } from "react-router-dom";

const Item = ({ id, nombre, precio, categoria, imagen, descripcion }) => {
  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);

  const categoriaValida = categoria;

  return (
    <article className="flex flex-col h-full p-5 transition-all duration-300 border shadow-xl border-neos/30 bg-strong rounded-4xl hover:-translate-y-1 group">
      <div className="relative w-full h-56 overflow-hidden border border-gray-400 rounded-3xl bg-fondo">
        <img
          src={imagen}
          alt={nombre}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-black tracking-widest text-neos bg-fondo/80 backdrop-blur-xs border border-neos/30 rounded-md uppercase">
          {categoriaValida}
        </span>
      </div>

      <div className="flex flex-col flex-1 pt-5 space-y-3">
        <h3 className="text-lg font-black tracking-wide text-gray-100 uppercase truncate transition-colors duration-300 group-hover:text-neos">
          {nombre}
        </h3>

        <p className="flex-1 text-sm font-medium leading-relaxed text-gray-400 line-clamp-2">
          {descripcion}
        </p>

        <p className="pt-2 text-xl font-black tracking-tight text-gray-200">
          {precioFormateado}
        </p>

        <div className="pt-2">
          <Link
            to={`/item/${id}`}
            className="block w-full py-4 text-sm font-black uppercase text-center tracking-wider text-white transition-all duration-300 rounded-full shadow-lg bg-neos from-neos hover:shadow-neos/10 hover:scale-[1.01] active:scale-98 cursor-pointer mt-2 hover:bg-orange-600"
          >
            Ver Detalle
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Item;
