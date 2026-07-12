import { HiCheckCircle, HiExclamationTriangle } from "react-icons/hi2";

export default function FeedbackModal({ isOpen, type, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-100 bg-black/5 backdrop-blur-md">
      <div className="w-full max-w-sm p-8 text-center border border-gray-800 shadow-2xl bg-strong rounded-3xl">
        <div className="flex justify-center mb-4">
          {type === "success" ? (
            <HiCheckCircle className="w-16 h-16 text-green-500" />
          ) : (
            <HiExclamationTriangle className="w-16 h-16 text-red-500" />
          )}
        </div>
        <h3 className="mb-2 text-lg font-black text-white uppercase">
          {type === "success" ? "¡Éxito!" : "Error"}
        </h3>
        <p className="mb-6 text-sm text-gray-400">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 font-black text-white uppercase transition-all rounded-xl bg-linear-to-r from-neos to-orange-600 hover:scale-105"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
