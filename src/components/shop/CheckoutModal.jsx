import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CheckoutModal = ({ isOpen, onClose, esError, mensaje }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm p-8 text-center duration-300 border border-gray-700 bg-strong rounded-3xl animate-in fade-in zoom-in">
        {esError ? (
          <FiAlertCircle className="mx-auto mb-4 text-red-500" size={48} />
        ) : (
          <FiCheckCircle className="mx-auto mb-4 text-green-500" size={48} />
        )}

        <h3
          className={`text-xl font-black uppercase ${esError ? "text-red-500" : "text-white"}`}
        >
          {esError ? "Pago Rechazado" : "¡Pago Exitoso!"}
        </h3>

        <p className="mt-2 mb-6 text-sm text-gray-400">{mensaje}</p>

        <button
          onClick={
            esError
              ? onClose
              : () => {
                  navigate("/");
                  setTimeout(() => window.location.reload(), 100);
                }
          }
          className={`w-full py-3 font-black text-white uppercase transition-all rounded-xl ${
            esError
              ? "bg-red-500 hover:bg-red-600"
              : "bg-neos hover:bg-orange-600"
          }`}
        >
          {esError ? "Intentar de nuevo" : "Volver al inicio"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
