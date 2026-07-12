import OrderStatusBadge from "./OrderStatusBadge";

export default function OrdersTable({ orders, onStatusChange }) {
  return (
    <div className="overflow-hidden border border-gray-800 bg-strong rounded-2xl">
      <table className="w-full text-left">
        <thead className="text-xs font-black text-gray-500 uppercase border-b border-gray-800 bg-fondo/50">
          <tr>
            <th className="p-4">Cliente</th>
            <th className="p-4">Total</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="text-sm transition-colors hover:bg-fondo/30"
            >
              <td className="p-4">
                <p className="font-bold text-white">{order.customer_name}</p>
                <p className="text-xs text-gray-500">{order.email}</p>
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
                  className="p-2 text-xs text-white border border-gray-700 rounded-lg bg-fondo"
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
  );
}
