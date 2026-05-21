import { LuSearch, LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";

const FilterSearch = ({ busqueda, setBusqueda, setPaginaActual, ordenPrecio, setOrdenPrecio }) => {
  
  const handleMenorMayor = () => {
    setPaginaActual(1);
    setOrdenPrecio(ordenPrecio === "menor-mayor" ? "" : "menor-mayor");
  };

  const handleMayorMenor = () => {
    setPaginaActual(1);
    setOrdenPrecio(ordenPrecio === "mayor-menor" ? "" : "mayor-menor");
  };

  return (
    <div className="flex flex-col items-center justify-between w-full gap-4 mb-12 md:flex-row">
      
      <div className="relative w-full max-w-md md:flex-1 group">
        <span className="absolute inset-y-0 flex items-center text-gray-500 transition-colors duration-300 left-4 group-focus-within:text-neos ">
          <LuSearch size={18} />
        </span>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          placeholder="Buscar suplemento o equipamiento..."
          className="w-full pl-11 pr-4 py-3.5 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-strong rounded-full focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos shadow-lg"
        />
      </div>

      <div className="flex flex-row justify-end w-full gap-3 md:w-auto">
        
        <button
          onClick={handleMenorMayor}
          title="Precio: Menor a Mayor"
          className={`px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border rounded-full shadow-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap min-w-36 ${
            ordenPrecio === "menor-mayor"
              ? "border-neos/30 bg-neos/10 text-neos shadow-neos/5"
              : "border-gray-400 bg-fondo text-gray-400 hover:border-gray-400 hover:text-gray-200"
          }`}
        >
          <LuArrowUpWideNarrow size={15} />
          <span>Precio: Mín-Máx</span>
        </button>

        <button
          onClick={handleMayorMenor}
          title="Precio: Mayor a Menor"
          className={`px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border rounded-full shadow-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap min-w-36 ${
            ordenPrecio === "mayor-menor"
              ? "border-neos/30 bg-neos/10 text-neos shadow-neos/5"
              : "border-gray-400 bg-fondo text-gray-400 hover:border-gray-400 hover:text-gray-200"
          }`}
        >
          <LuArrowDownWideNarrow size={15} />
          <span>Precio: Máx-Mín</span>
        </button>

      </div>

    </div>
  );
};

export default FilterSearch;