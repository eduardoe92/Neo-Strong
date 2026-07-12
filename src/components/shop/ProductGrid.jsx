import Item from "./Item.jsx";

const ProductGrid = ({ items, limpiarFiltro }) => {
  if (items.length === 0) {
    return (
      <div className="max-w-lg p-8 py-16 mx-auto text-center border border-neos/30 bg-strong rounded-3xl">
        <p className="text-base font-bold text-gray-400">
          No encontramos productos que coincidan con tu búsqueda.
        </p>
        <button
          onClick={limpiarFiltro}
          className="mt-4 text-xs font-black uppercase cursor-pointer text-neos hover:underline "
        >
          Limpiar Filtro
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up">
      {items.map((p) => (
        <Item key={p.id} {...p} />
      ))}
    </div>
  );
};

export default ProductGrid;
