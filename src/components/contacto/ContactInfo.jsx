import useFetch from "../../hooks/useFetch.js";

const ContactInfo = () => {
  const { data: equipo } = useFetch("/data/personal.json");
  const { data: redes } = useFetch("/data/redes.json");

  return (
    <section className="grid items-start grid-cols-1 gap-12 text-center md:grid-cols-2">
      <div className="p-8 space-y-4 border shadow-xl border-neos/30 bg-strong rounded-3xl">
        <h2 className="text-2xl font-black tracking-wider text-gray-300 uppercase">
          Ubicación
        </h2>
        <div className="space-y-1 text-sm text-gray-400">
          <p>Palermo Soho, CABA.</p>
          <p className="pt-2 text-xs font-medium tracking-widest text-gray-500 uppercase">
            Lunes a Viernes de
            <br />
            09 a 18hs.
          </p>
          <p className="pt-2 text-xs font-medium tracking-widest text-gray-500 uppercase">
            Sábados de
            <br />
            10 a 15hs.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full p-8 space-y-4 border shadow-xl border-neos/30 bg-strong rounded-3xl">
        <h2 className="text-2xl font-black tracking-wider text-gray-300 uppercase">
          Comunidad
        </h2>
        <p className="text-sm text-gray-500">
          Seguinos para rutinas, lanzamientos y stock alerts.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          {redes?.map((red) => (
            <a
              key={red.id}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 p-2 text-gray-300 transition-all duration-300 border rounded-full shadow-md border-neos/30 bg-fondo hover:text-neos hover:border-neos/30 hover:-translate-y-1 safe-svg-fix"
              dangerouslySetInnerHTML={{ __html: red.iconSvg }}
              title={red.nombre}
            />
          ))}
        </div>
      </div>

      <div className="pt-8 space-y-6 border-t border-neos/30 md:col-span-2">
        <h2 className="text-3xl font-black tracking-tight text-center text-gray-300 uppercase">
          Asesoramiento Staff
        </h2>
        <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-2">
          {equipo?.map((persona, index) => (
            <div
              key={index}
              className={`flex items-center gap-6 p-4 transition-all duration-300 bg-strong border border-neos/30 shadow-lg rounded-3xl hover:shadow
              ${index === 2 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}`}
            >
              <img
                src={persona.avatar}
                alt={persona.nombre}
                className="object-cover w-20 h-20 border-2 rounded-full border-neos/30 bg-fondo"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150";
                }}
              />
              <div className="text-left">
                <p className="font-bold tracking-wide text-gray-100 text-m">
                  {persona.nombre}
                </p>
                <p className="text-[10px] leading-4px font-bold tracking-widest text-neos uppercase mt-0.5">
                  {persona.puesto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
