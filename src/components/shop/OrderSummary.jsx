const OrderSummary = ({ cartItems }) => {
  const activeItems = cartItems.filter((item) => item.active !== false);
  const total = activeItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="w-full h-fit">
      <h2 className="mb-8 text-2xl font-black text-center text-white uppercase">
        Resumen del <span className="text-neos">Pedido</span>
      </h2>

      <div className="p-8 border border-gray-700 bg-strong rounded-3xl">
        <div className="space-y-4">
          {activeItems.map((item) => (
            <div
              key={item.productId || item.id || item._id}
              className="flex items-center justify-between gap-4 py-2 border-b border-gray-700/50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.imagen || item.image_url}
                  alt={item.name}
                  className="object-cover w-12 h-12 border border-gray-700 rounded-xl bg-fondo"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-200 uppercase">
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    Cant: {item.quantity}
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-black text-gray-300">
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  maximumFractionDigits: 0,
                }).format(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-6 mt-4 border-t border-gray-700">
          <div className="flex justify-between text-xl font-black text-white uppercase">
            <span>Total</span>
            <span className="text-neos">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              }).format(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
