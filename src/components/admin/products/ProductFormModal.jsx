import { useState } from "react";
import { HiXMark, HiArrowPath } from "react-icons/hi2";
import FeedbackModal from "./FeedbackModal";

export default function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      price: "",
      category: "",
      brand: "",
      quantity: "",
      stock: "",
      image_url: "",
      description: "",
      status: "active",
    },
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    const success = await onSave(formattedData);

    if (success) {
      setFeedback({
        isOpen: true,
        type: "success",
        message: "Producto agregado con éxito",
      });
    } else {
      setFeedback({
        isOpen: true,
        type: "error",
        message: "Hubo un problema al cargar el producto, inténtelo nuevamente",
      });
      setIsSubmitting(false);
    }
  };

  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, isOpen: false });
    if (feedback.type === "success") onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
        <div className="w-full max-w-2xl overflow-hidden border border-gray-800 shadow-2xl bg-strong rounded-3xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-fondo/50">
            <h2 className="text-xl font-black text-white uppercase">
              {initialData ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <button
              onClick={onClose}
              type="button"
              className="p-2 text-gray-400 transition-colors rounded-xl hover:bg-gray-800 hover:text-white"
            >
              <HiXMark size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 max-h-[75vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Nombre
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Marca
                </label>
                <input
                  required
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Categoría
                </label>
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
                >
                  <option value="">Seleccione...</option>
                  <option value="equipamiento">Equipamiento</option>
                  <option value="creatinas">Creatinas</option>
                  <option value="indumentaria">Indumentaria</option>
                  <option value="pre-entrenos">Pre-Entrenos</option>
                  <option value="proteinas">Proteínas</option>
                  <option value="snacks-saludables">Snacks-Saludables</option>
                  <option value="suplementos">Suplementos</option>
                  <option value="vitaminas">Vitaminas</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Cantidad/Peso (Ej: 1Kg)
                </label>
                <input
                  required
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Precio (ARS)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Stock
                </label>
                <input
                  required
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                URL de la Imagen
              </label>
              <input
                required
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.png"
                className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Descripción
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 text-white border border-gray-700 rounded-xl bg-fondo focus:border-neos focus:outline-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-bold text-gray-400 transition-colors rounded-xl hover:text-white hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 text-sm font-black text-white uppercase transition-all rounded-xl bg-linear-to-r from-neos to-orange-600 hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <HiArrowPath className="w-5 h-5 animate-spin" />
                ) : (
                  "Guardar"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <FeedbackModal
        isOpen={feedback.isOpen}
        type={feedback.type}
        message={feedback.message}
        onClose={handleCloseFeedback}
      />
    </>
  );
}
