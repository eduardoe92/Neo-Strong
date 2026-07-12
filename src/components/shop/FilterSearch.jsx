import SearchBar from "./SearchBar";
import PriceFilters from "./PriceFilters";
const FilterSearch = ({
  busqueda,
  setBusqueda,
  setPaginaActual,
  ordenPrecio,
  setOrdenPrecio,
}) => {
  return (
    <div className="flex flex-col items-center justify-between w-full gap-4 mb-12 md:flex-row">
      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        setPaginaActual={setPaginaActual}
      />

      <PriceFilters
        setPaginaActual={setPaginaActual}
        ordenPrecio={ordenPrecio}
        setOrdenPrecio={setOrdenPrecio}
      />
    </div>
  );
};

export default FilterSearch;
