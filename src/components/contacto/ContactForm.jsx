import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef();
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorEnvio(false);
    setErrorEmail(false);

    const formData = new FormData(formRef.current);
    const emailValue = formData.get("user_email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setErrorEmail(true);
      return;
    }

    setCargando(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setCargando(false);
          setEnviado(true);
          formRef.current.reset();
          setTimeout(() => setEnviado(false), 6000);
        },
        (error) => {
          console.error("Error al enviar el mail:", error);
          setCargando(false);
          setErrorEnvio(true);
        }
      );
  };

  return (
    <section className="w-full max-w-2xl p-8 mx-auto border shadow-2xl border-neos/30 md:p-10 bg-strong rounded-4xl animate-slide-up">
      <h2 className="mb-6 text-2xl font-black tracking-wider text-center text-gray-300 uppercase md:text-3xl md:text-left">
        ¿Tenés dudas con tu plan?
      </h2>
      
      {enviado && (
        <div className="p-6 mb-4 space-y-2 text-center border bg-fondo rounded-2xl border-neos/30/40 animate-slide-up">
          <p className="text-sm font-black tracking-widest uppercase text-neos">
            ¡Mensaje Recibido!
          </p>
          <p className="text-xs font-medium text-gray-400">
            Tu consulta ya está en manos de nuestros coaches. Te responderemos en menos de 24 horas hábiles.
          </p>
        </div>
      )}

      {errorEnvio && (
        <div className="p-4 mb-4 text-xs font-bold tracking-wide text-center text-red-400 uppercase border bg-red-500/10 border-red-500/30 rounded-xl animate-slide-up">
          Hubo un problema al enviar el mensaje. Por favor, reintentá en unos minutos.
        </div>
      )}

      {errorEmail && (
        <div className="p-4 mb-4 text-xs font-bold tracking-wide text-center text-red-400 uppercase border bg-red-500/10 border-red-500/30 rounded-xl animate-slide-up">
          Por favor, ingresá un correo electrónico válido.
        </div>
      )}

      {!enviado && (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-xs font-black tracking-widest text-gray-400 uppercase">
              Nombre Completo
            </label>
            <input
              required
              type="text"
              name="user_name"
              className="w-full p-4 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-black tracking-widest text-gray-400 uppercase">
              Correo Electrónico
            </label>
            <input
              required
              type="email"
              name="user_email"
              className="w-full p-4 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
              placeholder="Tu email"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-black tracking-widest text-gray-400 uppercase">
              Mensaje o Consulta Técnica
            </label>
            <textarea
              required
              name="message"
              rows="4"
              className="w-full p-4 text-sm text-gray-200 placeholder-gray-600 transition-all duration-300 border border-gray-400 resize-none bg-fondo rounded-xl focus:outline-hidden focus:border-neos/30 focus:ring-1 focus:ring-neos"
              placeholder="¿Qué dudas tenés sobre suplementación, stock o equipamiento?"
            ></textarea>
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={cargando}
              className="w-full py-4 text-sm font-black uppercase tracking-wider text-white transition-all duration-300 rounded-full shadow-lg bg-neos from-neos hover:shadow-neos/10 hover:scale-[1.01] active:scale-98 cursor-pointer mt-2 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cargando ? "Enviando fuerza..." : "Enviar Mensaje"}
            </button>
            
            <p className="text-[11px] font-medium tracking-wide text-center text-gray-500 uppercase">
              Nos pondremos en contacto con vos lo más pronto posible.
            </p>
          </div>
        </form>
      )}
    </section>
  );
};

export default ContactForm;