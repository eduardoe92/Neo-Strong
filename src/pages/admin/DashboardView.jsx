import { useState, useEffect } from "react";
import { FaChartLine, FaShoppingCart, FaEye, FaEyeSlash } from "react-icons/fa";
import { adminService } from "../../services/adminService";
import StatCard from "../../components/admin/dashboard/StatCard";
import LowStockAlert from "../../components/admin/dashboard/LowStockAlert";
import HighStockReport from "../../components/admin/dashboard/HighStockReport";
import OrderAlert from "../../components/admin/dashboard/OrderAlert";

export default function DashboardView() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRevenue, setShowRevenue] = useState(false);

  const finalizados = orders.filter((o) => o.status === "finalizado");
  const totalRevenue = finalizados.reduce(
    (acc, curr) => acc + (curr.total || 0),
    0,
  );
  const totalOrders = finalizados.length;

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        const data = await adminService.getProducts();
        const productList = Array.isArray(data) ? data : data.products || [];
        setProducts(productList);

        const response = await fetch("/data/ordersData.json");
        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="w-12 h-12 border-4 rounded-full border-t-neos border-gray-700/50 animate-spin" />
        <div className="mt-6 space-y-1">
          <h3 className="text-xl font-black tracking-wide text-gray-200 uppercase">
            Cargando Dashboard
          </h3>
          <p className="max-w-xs mx-auto text-sm font-medium leading-relaxed text-gray-400">
            Obteniendo métricas y estado del inventario...
          </p>
        </div>
      </div>
    );
  }

  const lowStockProducts = products.filter((p) => p.stock < 8);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-white uppercase">
        Resumen de <span className="text-neos">Neo-Strong</span>
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatCard
          title="Ingresos Totales"
          value={
            showRevenue ? `$ ${totalRevenue.toLocaleString()}` : "*********"
          }
          icon={FaChartLine}
          colorClass="bg-neos/10 text-neos"
          rightIcon={
            <button
              onMouseDown={() => setShowRevenue(true)}
              onMouseUp={() => setShowRevenue(false)}
              onMouseLeave={() => setShowRevenue(false)}
              onTouchStart={() => setShowRevenue(true)}
              onTouchEnd={() => setShowRevenue(false)}
              className="p-6 transition-colors rounded-full hover:bg-white/10"
            >
              {showRevenue ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
            </button>
          }
        />
        <StatCard
          title="Pedidos Finalizados"
          value={totalOrders}
          icon={FaShoppingCart}
          colorClass="bg-orange-500/10 text-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <OrderAlert
          title="En camino"
          orders={orders.filter((o) => o.status === "enviado")}
          statusType="Enviando"
        />
        <OrderAlert
          title="Pendiente de Envío"
          orders={orders.filter((o) => o.status === "pendiente_envio")}
          statusType="Pendiente_envio"
        />
        <OrderAlert
          title="Pendiente de Pago"
          orders={orders.filter((o) => o.status === "pendiente_pago")}
          statusType="Pendiente_pago"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HighStockReport products={products} />
        <LowStockAlert alerts={lowStockProducts} />
      </div>
    </div>
  );
}
