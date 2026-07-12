import { useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

export default function CartFeedback({ isOpen, type, message, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-9999 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm p-8 text-center border border-gray-700 shadow-2xl bg-strong rounded-3xl animate-slide-up">
        <div className="flex justify-center mb-4">
          {type === "success" ? (
            <HiCheckCircle className="w-16 h-16 text-neos" />
          ) : (
            <HiXCircle className="w-16 h-16 text-red-500" />
          )}
        </div>
        <h3 className="mb-2 text-xl font-black text-white uppercase">
          {type === "success" ? "¡Excelente!" : "Ups, hubo un error"}
        </h3>
        <p className="mb-6 text-sm text-gray-400">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 font-black text-white uppercase transition-all rounded-xl bg-linear-to-r from-neos to-orange-600 hover:scale-105 active:scale-95"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
