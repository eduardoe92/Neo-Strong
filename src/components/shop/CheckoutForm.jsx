import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { cartService } from "../../services/cartService";
import CheckoutModal from "./CheckoutModal";

const CheckoutForm = () => {
  const [procesando, setProcesando] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    esError: false,
    mensaje: "",
  });

  const handleCardChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    const formatted = value.match(/.{1,4}/g)?.join("-") || "";
    setCardNumber(formatted);
  };

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length === 1 && parseInt(value) > 1) {
      value = "0" + value;
    }
    if (value.length === 2) {
      let m = parseInt(value);
      if (m === 0) value = "01";
      if (m > 12) value = "12";
    }
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcesando(true);

    try {
      await cartService.checkout();
      localStorage.removeItem("cart");
      setModal({
        isOpen: true,
        esError: false,
        mensaje: "Tu pedido ha sido procesado correctamente.",
      });
    } catch {
      setModal({
        isOpen: true,
        esError: true,
        mensaje:
          "Hubo un problema al procesar tu pago. Por favor, inténtalo nuevamente.",
      });
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <CheckoutModal
        isOpen={modal.isOpen}
        esError={modal.esError}
        mensaje={modal.mensaje}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />

      <h2 className="mb-8 text-2xl font-black text-center text-gray-100 uppercase">
        Datos de <span className="text-neos">Pago</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6 border border-gray-700 bg-strong rounded-3xl"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-xs font-black text-gray-400 uppercase">
              Nombre en la tarjeta
            </label>
            <input
              type="text"
              required
              className="w-full p-3 text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
              placeholder="JUAN PEREZ"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs font-black text-gray-400 uppercase">
              Número de tarjeta
            </label>
            <input
              type="text"
              required
              value={cardNumber}
              onChange={handleCardChange}
              maxLength="19"
              className="w-full p-3 font-mono text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
              placeholder="0000-0000-0000-0000"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2 text-xs font-black text-gray-400 uppercase">
                Expira
              </label>
              <input
                type="text"
                placeholder="MM/AA"
                maxLength="5"
                onChange={handleDateChange}
                pattern="(0[1-9]|1[0-2])\/\d{2}"
                title="Ingresa una fecha válida (MM/AA)"
                required
                className="w-full p-3 font-mono text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-xs font-black text-gray-400 uppercase">
                CVV
              </label>
              <input
                type="text"
                maxLength="3"
                placeholder="123"
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
                required
                className="w-full p-3 text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={procesando}
          className="flex items-center justify-center w-full gap-2 py-4 font-black text-white uppercase transition-all rounded-full bg-neos hover:bg-orange-600 disabled:opacity-50"
        >
          {procesando ? (
            "Procesando..."
          ) : (
            <>
              <FiLock size={16} /> Confirmar Pago
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-500">
        <p className="flex items-center justify-center gap-2 text-[15px] uppercase tracking-widest font-bold">
          Este es un entorno de demostración
        </p>
        <p className="text-[16px] text-gray-600 px-4 mt-1">
          Ningún pago será procesado y los datos de la tarjeta no se guardarán
          en ningún lugar.
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
