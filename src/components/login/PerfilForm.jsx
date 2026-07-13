import { useState, useEffect } from "react";
import { authService } from "../../services/authService";
import PerfilModal from "./PerfilModal";

const PerfilForm = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    mensaje: "",
    esError: false,
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await authService.getProfile();
        setUsuario({
          nombre: data.name || "",
          email: data.email || "",
          telefono: data.phone || "",
          direccion: data.shipping_address || "",
          fechaNacimiento: data.birth_date ? data.birth_date.split("T")[0] : "",
        });
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    };
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosParaEnviar = {
      name: usuario.nombre,
      phone: usuario.telefono,
      birth_date: usuario.fechaNacimiento,
      shipping_address: usuario.direccion,
    };

    try {
      await authService.updateProfile(datosParaEnviar);
      setModal({
        isOpen: true,
        mensaje: "Perfil actualizado correctamente",
        esError: false,
      });
      localStorage.setItem("userName", usuario.nombre);
      window.dispatchEvent(new Event("loginSuccess"));
    } catch (err) {
      setModal({
        isOpen: true,
        mensaje: "Error al actualizar: " + err.message,
        esError: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 bg-fondo">
      <div className="w-full max-w-md p-8 border border-gray-700 bg-strong rounded-3xl">
        <h2 className="mb-6 text-2xl font-black text-center text-white uppercase">
          Mi Perfil
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-xs font-bold text-gray-400 uppercase">
              Nombre
            </label>
            <input
              type="text"
              value={usuario.nombre}
              onChange={(e) =>
                setUsuario({ ...usuario, nombre: e.target.value })
              }
              className="w-full p-3 text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-gray-400 uppercase">
              Email
            </label>
            <input
              type="email"
              value={usuario.email}
              onChange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
              className="w-full p-3 text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-gray-400 uppercase">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              value={usuario.fechaNacimiento}
              onChange={(e) =>
                setUsuario({ ...usuario, fechaNacimiento: e.target.value })
              }
              className="w-full p-3 text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-gray-400 uppercase">
              Teléfono
            </label>
            <input
              type="tel"
              value={usuario.telefono}
              onChange={(e) =>
                setUsuario({ ...usuario, telefono: e.target.value })
              }
              className="w-full p-3 text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-gray-400 uppercase">
              Dirección
            </label>
            <input
              type="text"
              value={usuario.direccion}
              onChange={(e) =>
                setUsuario({ ...usuario, direccion: e.target.value })
              }
              className="w-full p-3 text-white border border-gray-600 outline-none rounded-xl bg-fondo focus:border-neos"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 font-black text-white uppercase cursor-pointer rounded-xl bg-neos hover:bg-orange-600"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
      <PerfilModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        mensaje={modal.mensaje}
        esError={modal.esError}
      />
    </div>
  );
};

export default PerfilForm;
