import { useState } from "react";
import { FaBox, FaTruck, FaClock, FaCreditCard } from "react-icons/fa";
import NumericPagination from "../products/NumericPagination";

export default function OrderAlert({ title, orders, statusType }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColors = () => {
    switch (statusType) {
      case "Enviando":
        return "text-orange-500";
      case "Pendiente_envio":
        return "text-blue-500";
      case "Pendiente_pago":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };

  const colorClass = getStatusColors();

  const getIcon = () => {
    switch (statusType) {
      case "Enviando":
        return <FaTruck size={24} />;
      case "Pendiente_envio":
        return <FaClock size={24} />;
      case "Pendiente_pago":
        return <FaCreditCard size={24} />;
      default:
        return <FaBox size={24} />;
    }
  };

  return (
    <div className="flex flex-col p-6 pb-5 order-gray-800 pborder bg-strong rounded-2xl h-88">
      <div className={`flex items-center gap-2 mb-4 ${colorClass}`}>
        {getIcon()}
        <h2 className="text-xl font-black uppercase">
          {title} <span className={colorClass}>({orders?.length || 0})</span>
        </h2>
      </div>

      <ul className="space-y-2 h-60">
        {orders?.length > 0 ? (
          currentOrders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between p-3 text-sm border border-gray-800 rounded-lg bg-fondo"
            >
              <span className="font-bold text-white">
                #{order.id} - {order.customer_name}
              </span>
              <span className="text-gray-400">{order.date || "Sin fecha"}</span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No hay pedidos en este estado.
          </p>
        )}
      </ul>

      {orders?.length > itemsPerPage && (
        <NumericPagination
          currentPage={currentPage}
          totalItems={orders.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
