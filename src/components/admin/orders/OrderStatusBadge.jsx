export default function OrderStatusBadge({ status }) {
  const styles = {
    pendiente_pago: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    pendiente_envio: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    enviado: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    finalizado: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelado: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${styles[status] || "bg-gray-800 text-gray-400"}`}
    >
      {status ? status.replace("_", " ") : "N/A"}
    </span>
  );
}
