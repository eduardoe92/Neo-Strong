import { useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import NumericPagination from "../products/NumericPagination";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const getSortIcon = (columnKey, sortConfig) => {
  if (sortConfig.key !== columnKey) return <FaSort className="inline ml-2" />;
  return sortConfig.direction === "asc" ? (
    <FaSortUp className="inline ml-2 text-neos" />
  ) : (
    <FaSortDown className="inline ml-2 text-neos" />
  );
};

export default function OrdersTable({ orders, onStatusChange }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue, "es", {
        sensitivity: "base",
        numeric: true,
      });
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden border border-gray-800 bg-strong rounded-2xl">
        <table className="w-full text-left table-fixed">
          <thead className="text-xs font-black text-gray-500 uppercase border-b border-gray-800 bg-fondo/50">
            <tr>
              <th
                className="p-4 w-[40%] cursor-pointer hover:text-white"
                onClick={() => requestSort("customer_name")}
              >
                Cliente {getSortIcon("customer_name", sortConfig)}
              </th>
              <th
                className="p-4 w-[20%] cursor-pointer hover:text-white"
                onClick={() => requestSort("total")}
              >
                Total {getSortIcon("total", sortConfig)}
              </th>
              <th
                className="p-4 w-[20%] cursor-pointer hover:text-white"
                onClick={() => requestSort("status")}
              >
                Estado {getSortIcon("status", sortConfig)}
              </th>
              <th className="p-4 w-[20%]">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="text-sm transition-colors hover:bg-fondo/30"
              >
                <td className="p-4 truncate">
                  <p className="font-bold text-white truncate">
                    {order.customer_name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {order.email}
                  </p>
                </td>
                <td className="p-4 font-mono font-bold text-neos">
                  $ {order.total}
                </td>
                <td className="p-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                    className="w-full p-2 text-xs text-white border border-gray-700 rounded-lg bg-fondo"
                  >
                    <option value="pendiente_pago">Pendiente Pago</option>
                    <option value="pendiente_envio">Pendiente Envío</option>
                    <option value="enviado">Enviado</option>
                    <option value="finalizado">Finalizado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NumericPagination
        currentPage={currentPage}
        totalItems={orders.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
