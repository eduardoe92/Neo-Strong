import { useState, useEffect } from "react";
import OrdersTable from "../../components/admin/orders/OrdersTable";

export default function AdminOrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/public/data/ordersData.json")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error cargando los pedidos:", error));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-12 h-12 border-4 rounded-full border-t-neos border-gray-700/50 animate-spin" />
        <div className="mt-6 space-y-1">
          <h3 className="text-xl font-black tracking-wide text-gray-200 uppercase">
            Cargando Pedidos
          </h3>
          <p className="max-w-xs mx-auto text-sm font-medium leading-relaxed text-gray-400">
            Estamos obteniendo la información logística. Por favor, espera...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-white uppercase">
        Logística de <span className="text-neos">Pedidos</span>
      </h1>
      <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}
