import useFetch from "/src/hooks/useFetch.js";

const Footer = () => {
  const { data: equipo } = useFetch("/data/personal.json");
  const { data: redes } = useFetch("/data/redes.json");
  const year = new Date().getFullYear();

  return (
    <footer className="p-12 mt-auto text-gray-100 border-t border-gray-700 bg-strong sm:p-6 sm:gap-2">
      <div className="max-w-6xl mx-auto">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2 ">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="h-30 w-30 shrink-0">
              <img
                src="/logo.webp"
                alt="NEO-STRONG Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(244,63,94,0.1)]"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight uppercase text-neos">
                NEO-STRONG
              </h3>
              <p className="max-w-sm mx-auto text-sm leading-relaxed text-gray-400 sm:mx-0">
                Impulsamos tu rendimiento con suplementación avanzada y
                equipamiento de fuerza diseñado bajo estándares de nivel
                competitivo.
              </p>
            </div>
          </div>

          <hr className="w-full my-0 border-t border-neos md:hidden" />
          
          <div className="flex flex-wrap justify-center gap-4 sm:justify-center md:justify-center lg:justify-end">
            {equipo?.map((p, i) => (
              <div
                key={i}
                className="w-32 p-4 text-center border bg-fondo/40 rounded-2xl border-neos/30"
              >
                <img
                  src={p.avatar}
                  alt={p.nombre}
                  className="object-cover mx-auto mb-2 border rounded-full w-14 h-14 border-neos/30/30"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100";
                  }}
                />
                <p className="text-[10px] font-bold tracking-wide truncate text-gray-200">
                  {p.nombre}
                </p>
                <p className="text-[8px] text-neos font-semibold uppercase tracking-wider mt-0.5">
                  {p.puesto}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-6 mt-8 text-center border-t border-neos md:flex-row md:text-left">
          <p className="text-xs tracking-widest text-gray-500">
            &copy; {year} NEO-STRONG. <br className="md:hidden" />
            Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-4">
            {redes?.map((red) => (
              <a
                key={red.id}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center p-2.5 bg-fondo border border-neos/30 rounded-full text-gray-300 hover:text-neos transition-all duration-300 hover:-translate-y-1 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current"
                dangerouslySetInnerHTML={{ __html: red.iconSvg }}
                title={red.nombre}
              ></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
