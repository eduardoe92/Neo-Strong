import { LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";

const PriceFilters = ({ setPaginaActual, ordenPrecio, setOrdenPrecio }) => {
  const handleOrden = (tipo) => {
    setPaginaActual(1);
    setOrdenPrecio(ordenPrecio === tipo ? "" : tipo);
  };

  const buttonClass = (tipo) =>
    `px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border rounded-full shadow-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap min-w-36 ${
      ordenPrecio === tipo
        ? "border-neos/30 bg-neos/10 text-neos shadow-neos/5"
        : "border-gray-400 bg-fondo text-gray-400 hover:border-gray-400 hover:text-gray-200"
    }`;

  return (
    <div className="flex flex-row justify-end w-full gap-3 md:w-auto">
      <button
        onClick={() => handleOrden("menor-mayor")}
        className={buttonClass("menor-mayor")}
      >
        <LuArrowUpWideNarrow size={15} />
        <span>Precio: Mín-Máx</span>
      </button>

      <button
        onClick={() => handleOrden("mayor-menor")}
        className={buttonClass("mayor-menor")}
      >
        <LuArrowDownWideNarrow size={15} />
        <span>Precio: Máx-Mín</span>
      </button>
    </div>
  );
};

export default PriceFilters;
