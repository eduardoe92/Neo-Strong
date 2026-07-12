import { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import OrdersTable from "../../components/admin/orders/OrdersTable";

export default function AdminOrdersView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminService.getOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await adminService.updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-white uppercase">
        Logística de <span className="text-neos">Pedidos</span>
      </h1>
      <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}
