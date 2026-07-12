import { LuAlertTriangle } from "react-icons/lu";

export default function LowStockAlert({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="p-6 text-center border border-gray-800 bg-strong rounded-2xl">
        <p className="text-gray-400">
          Todo el inventario está en niveles óptimos.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-800 bg-strong rounded-2xl">
      <div className="flex items-center gap-2 p-4 border-b border-gray-800 bg-red-950/20">
        <LuAlertTriangle className="text-red-500" size={20} />
        <h2 className="text-lg font-bold text-red-500 uppercase">
          Alertas de Stock ({products.length})
        </h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-12 gap-4 pb-2 mb-2 text-xs font-black text-gray-500 uppercase border-b border-gray-800">
          <div className="col-span-8">Producto</div>
          <div className="col-span-4 text-center">Stock Actual</div>
        </div>

        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id || product._id}
              className="grid items-center grid-cols-12 gap-4 p-2 transition-colors rounded-lg hover:bg-fondo/50"
            >
              <div className="col-span-8 text-sm font-bold text-gray-200 truncate">
                {product.name}
              </div>
              <div className="col-span-4 text-center">
                <span
                  className={`px-3 py-1 text-xs font-black rounded-full ${
                    product.stock === 0
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  }`}
                >
                  {product.stock} unid.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
