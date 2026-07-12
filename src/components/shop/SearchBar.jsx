import { LuSearch } from "react-icons/lu";

const SearchBar = ({ busqueda, setBusqueda, setPaginaActual }) => {
  return (
    <div className="relative w-full max-w-md md:flex-1 group">
      <span className="absolute inset-y-0 flex items-center text-gray-500 transition-colors duration-300 left-4 group-focus-within:text-neos">
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
  );
};

export default SearchBar;
