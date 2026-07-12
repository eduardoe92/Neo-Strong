import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { authService } from "../../services/authService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const sesionActiva = localStorage.getItem("isLoggedIn");
    if (sesionActiva === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlerta({
        tipo: "error",
        mensaje: "Por favor, completá todos los campos.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlerta({
        tipo: "error",
        mensaje: "Por favor, ingresá un correo electrónico válido.",
      });
      return;
    }

    try {
      const respuesta = await authService.login(email, password);

      const nombreFinal =
        respuesta.nombre ||
        respuesta.user?.name ||
        respuesta.data?.name ||
        "Usuario";
      const rolFinal = respuesta.role || respuesta.user?.role || "user";
      const tokenFinal = respuesta.token || respuesta.data?.token;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", tokenFinal);
      localStorage.setItem("userRole", rolFinal);
      localStorage.setItem("userName", nombreFinal);

      window.dispatchEvent(new Event("loginSuccess"));

      setAlerta({
        tipo: rolFinal === "admin" ? "admin" : "exito",
        mensaje:
          rolFinal === "admin"
            ? "¡Bienvenido Administrador!"
            : `¡Ingreso correcto! Bienvenido, ${nombreFinal}.`,
      });

      const rutaDestino = rolFinal === "admin" ? "/admin" : "/";
      const tiempoRedireccion = rolFinal === "admin" ? 1000 : 2000;

      setTimeout(() => {
        navigate(rutaDestino);
      }, tiempoRedireccion);
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensaje:
          error.message || "Credenciales incorrectas o problemas de conexión.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[54vh] px-4 bg-fondo">
      <div className="w-full max-w-md p-8 border shadow-2xl border-neos/30 bg-strong backdrop-blur-md rounded-2xl">
        <h2 className="mb-2 text-3xl font-black tracking-tight text-center text-gray-100 uppercase">
          Iniciar Sesión
        </h2>
        <p className="mb-6 text-xs tracking-widest text-center text-gray-400 uppercase">
          Ingresá a tu cuenta de fuerza
        </p>

        {alerta && (
          <div
            className={`p-4 mb-4 text-xs font-bold uppercase tracking-wide rounded-xl text-center border ${
              alerta.tipo === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : alerta.tipo === "admin"
                  ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                  : "bg-neos/10 border-neos/30 text-neos"
            }`}
          >
            {alerta.mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
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
                placeholder="••••••••"
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
            className="w-full py-4 text-sm font-black uppercase tracking-wider text-white transition-all duration-300 rounded-full shadow-lg bg-neos hover:shadow-neos/10 hover:scale-[1.01] active:scale-98 cursor-pointer mt-2 hover:bg-orange-600"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs tracking-wider text-gray-400 uppercase">
            ¿No tenés una cuenta?{" "}
            <Link
              to="/registro"
              className="font-bold bg-clip-text bg-linear-to-r text-neos hover:text-orange-400 hover:brightness-110 transition-all border-b border-neos/30 pb-0.5 ml-1"
            >
              Registrate acá
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
