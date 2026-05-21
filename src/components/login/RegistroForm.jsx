import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const RegistroForm = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !email ||
      !telefono ||
      !direccion ||
      !fechaNacimiento ||
      !password
    ) {
      setAlerta({
        tipo: "error",
        mensaje: "Por favor, completá todos los campos para el registro.",
      });
      return;
    }

    setAlerta({
      tipo: "exito",
      mensaje: `¡Cuenta creada con éxito para ${nombre}! Ya podés iniciar sesión.`,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 py-8 bg-fondo">
      <div className="w-full max-w-md p-8 border shadow-2xl border-neos/30 bg-strong backdrop-blur-md rounded-2xl">
        <h2 className="mb-2 text-3xl font-black tracking-tight text-center text-gray-100 uppercase">
          Crear Cuenta
        </h2>
        <p className="mb-6 text-xs tracking-widest text-center text-gray-400 uppercase">
          Únete a la comunidad
        </p>

        {alerta && (
          <div
            className={`p-4 mb-4 text-xs font-bold uppercase tracking-wide rounded-xl text-center border ${
              alerta.tipo === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-neos/10 border-neos/30 text-neos"
            }`}
          >
            {alerta.mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Nombre Completo
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="w-full p-3 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              className="w-full p-3 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                Teléfono
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingresa tu teléfono"
                className="w-full p-3 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                F. de Nacimiento
              </label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full p-3 text-sm text-gray-200 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos scheme-dark"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Dirección de Envío
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ingresa tu dirección"
              className="w-full p-3 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <input
                type={mostrarPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full p-3 pr-12 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute text-gray-400 transition-colors cursor-pointer right-4 hover:text-neos focus:outline-hidden"
              >
                {mostrarPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-sm font-black uppercase  tracking-wider text-white transition-all duration-300 rounded-full shadow-lg bg-neos from-neos hover:shadow-neos/10 hover:scale-[1.01] active:scale-98 cursor-pointer mt-2 hover:bg-orange-600"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroForm;
