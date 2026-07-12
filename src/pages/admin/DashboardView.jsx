import { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import {
  FaChartLine,
  FaBox,
  FaExclamationTriangle,
  FaShoppingCart,
} from "react-icons/fa";

export default function DashboardView() {
  const [data, setData] = useState({ revenue: 0, order_count: 0, alerts: [] });

  useEffect(() => {
    adminService.getDashboard().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-white uppercase">
        Resumen del <span className="text-neos">Negocio</span>
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 p-6 border border-gray-800 bg-strong rounded-2xl">
          <div className="p-4 bg-neos/10 text-neos rounded-xl">
            <FaChartLine size={30} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase">
              Ingresos Totales
            </p>
            <h2 className="text-2xl font-black text-white">
              $ {data.revenue.toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 border border-gray-800 bg-strong rounded-2xl">
          <div className="p-4 text-orange-500 bg-orange-500/10 rounded-xl">
            <FaShoppingCart size={30} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase">
              Pedidos Finalizados
            </p>
            <h2 className="text-2xl font-black text-white">
              {data.order_count}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6 border border-gray-800 bg-strong rounded-2xl">
        <div className="flex items-center gap-2 mb-6 text-red-500">
          <FaExclamationTriangle size={24} />
          <FaBox size={24} />
          <h2 className="text-xl font-black uppercase">
            Alertas de Stock Bajo
          </h2>
        </div>

        {data.alerts.length > 0 ? (
          <ul className="space-y-2">
            {data.alerts.map((prod) => (
              <li
                key={prod.id}
                className="flex justify-between p-3 text-sm border border-gray-800 rounded-lg bg-fondo"
              >
                <span className="font-bold text-white">{prod.name}</span>
                <span className="font-black text-red-500">
                  Stock: {prod.stock}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-bold text-green-500">
            ¡Todo el inventario está en niveles óptimos!
          </p>
        )}
      </div>
    </div>
  );
}
