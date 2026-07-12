import {
  FaEdit,
  FaTrash,
  FaEyeSlash,
  FaEye,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";

const SortIcon = ({ column, sortConfig }) => {
  if (sortConfig?.key !== column)
    return <FaSort className="inline ml-2 opacity-30" />;
  return sortConfig.direction === "asc" ? (
    <FaSortUp className="inline ml-2" />
  ) : (
    <FaSortDown className="inline ml-2" />
  );
};

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  onToggleStatus,
  onSort,
  sortConfig,
}) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="p-8 font-bold text-center text-gray-500 border border-gray-800 rounded-2xl bg-strong">
        No hay productos registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-800 rounded-2xl bg-strong">
      <table className="w-full text-left border-collapse table-fixed">
        <thead>
          <tr className="text-xs font-black text-gray-500 uppercase border-b border-gray-800 bg-fondo/50">
            <th
              className="w-[45%] p-4 cursor-pointer hover:text-white"
              onClick={() => onSort("name")}
            >
              Producto <SortIcon column="name" sortConfig={sortConfig} />
            </th>
            <th
              className="w-[15%] p-4 cursor-pointer hover:text-white"
              onClick={() => onSort("category")}
            >
              Categoría <SortIcon column="category" sortConfig={sortConfig} />
            </th>
            <th
              className="w-[10%] p-4 cursor-pointer hover:text-white"
              onClick={() => onSort("price")}
            >
              Precio <SortIcon column="price" sortConfig={sortConfig} />
            </th>
            <th
              className="w-[10%] p-4 text-center cursor-pointer hover:text-white"
              onClick={() => onSort("stock")}
            >
              Stock <SortIcon column="stock" sortConfig={sortConfig} />
            </th>
            <th
              className="w-[10%] p-4 text-center cursor-pointer hover:text-white"
              onClick={() => onSort("status")}
            >
              Estado <SortIcon column="status" sortConfig={sortConfig} />
            </th>
            <th className="w-[10%] p-4 text-center">Acción</th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-800 divide-y divide-gray-400">
          {products.map((product) => {
            const isPaused = product.active === false;
            return (
              <tr
                key={product.id || product._id}
                className={`transition-colors hover:bg-fondo/30 ${isPaused ? "opacity-60" : ""}`}
              >
                <td className="p-4 truncate">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imagen || product.image_url}
                      alt={product.name}
                      className="object-cover w-12 h-12 border border-gray-700 rounded-lg bg-fondo shrink-0"
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                    <div className="truncate">
                      <p className="text-sm font-bold text-gray-200 uppercase truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-400 capitalize truncate">
                  {product.category}
                </td>
                <td className="p-4 font-mono text-sm font-bold text-neos">
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </td>
                <td className="p-4 font-bold text-center text-gray-300">
                  {product.stock}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-black uppercase rounded-full border ${isPaused ? "bg-gray-800 text-gray-400 border-gray-700" : "bg-green-500/10 text-green-400 border-green-500/20"}`}
                  >
                    {isPaused ? "Pausado" : "Activo"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onToggleStatus(product)}
                      className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700"
                    >
                      {isPaused ? (
                        <FaEye size={18} />
                      ) : (
                        <FaEyeSlash size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-blue-400 transition-colors rounded-lg hover:text-white hover:bg-blue-600/20"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 text-red-400 transition-colors rounded-lg hover:text-white hover:bg-red-600/20"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
