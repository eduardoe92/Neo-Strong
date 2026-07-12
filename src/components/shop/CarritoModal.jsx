const CarritoModal = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm p-6 border border-gray-700 shadow-2xl bg-strong rounded-3xl">
        <h3 className="mb-2 text-lg font-black text-center text-gray-100 uppercase">
          {title}
        </h3>
        <p className="mb-6 text-sm text-center text-gray-400">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 text-xs font-black text-white uppercase rounded-full bg-neos hover:bg-orange-600"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
export default CarritoModal;
