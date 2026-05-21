import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Pagination = ({ paginaActual, totalPaginas, setPaginaActual }) => {
  if (totalPaginas <= 1) return null;

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-12 mt-8 border-t select-none border-neos sm:flex-row">
      <button
        onClick={paginaAnterior}
        disabled={paginaActual === 1}
        className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider text-gray-400 bg-strong border border-gray-400 rounded-xl transition-all duration-300 hover:text-neos hover:border-neos/30 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <LuChevronLeft size={16} />
        Anterior
      </button>

      <div className="flex items-center gap-2.5 px-2">
        {Array.from({ length: totalPaginas }).map((_, index) => {
          const numeroPagina = index + 1;
          const esActiva = numeroPagina === paginaActual;
          return (
            <button
              key={numeroPagina}
              onClick={() => setPaginaActual(numeroPagina)}
              className={`h-7 rounded-full text-xs font-black transition-all duration-300 flex items-center justify-center cursor-pointer ${
                esActiva 
                  ? "w-10 bg-linear-to-r from-neos to-orange-500 text-white shadow-xs shadow-neos/40" 
                  : "w-7 bg-gray-900 text-gray-500 border border-gray-400/60 hover:text-neos hover:border-neos/30/50 hover:bg-strong"
              }`}
            >
              {numeroPagina}
            </button>
          );
        })}
      </div>

      <button
        onClick={paginaSiguiente}
        disabled={paginaActual === totalPaginas}
        className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider text-gray-400 bg-strong border border-gray-400 rounded-xl transition-all duration-300 hover:text-neos hover:border-neos/30 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        Siguiente
        <LuChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;