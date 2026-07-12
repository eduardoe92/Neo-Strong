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

  if (loading) return <div className="text-white">Cargando pedidos...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-white uppercase">
        Logística de <span className="text-neos">Pedidos</span>
      </h1>
      <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}
