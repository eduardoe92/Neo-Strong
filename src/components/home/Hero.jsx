import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import useFetch from "/src/hooks/useFetch.js";

const Hero = () => {
  const { data: slides } = useFetch("/data/heroSlides.json");
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    if (!slides || slides.length === 0) return;
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (!slides || slides.length === 0) return;
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };


useEffect(() => {
  if (!slides || slides.length === 0) return;
  
  const timer = setInterval(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, 6000);
  
  return () => clearInterval(timer);
}, [slides]);

  if (!slides || slides.length === 0) {
    return <div className="h-[85vh] w-full bg-fondo border border-gray-800 rounded-4xl animate-pulse" />;
  }

  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center rounded-4xl overflow-hidden bg-fondo border border-gray-900 shadow-2xl group/hero">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-35 scale-100" : "opacity-0 scale-105"
          } transition-transform duration-6000`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-fondo via-transparent to-fondo/50" />
        </div>
      ))}

      <div className="relative z-10 max-w-4xl px-6 text-center select-none">
        {slides.map((slide, index) => {
          if (index !== current) return null;
          return (
            <div key={slide.id} className="space-y-6 animate-slide-up">
              <span className="inline-block px-4 py-1.5 text-s font-black tracking-widest text-neos bg-neos/10 border border-neos/30/30 rounded-full uppercase">
                {slide.tag}
              </span>
              <h1 className="text-4xl font-black leading-none tracking-tighter text-gray-100 uppercase md:text-7xl">
                {slide.title}
              </h1>
              <p className="max-w-2xl mx-auto text-base font-medium leading-relaxed text-gray-400 md:text-lg">
                {slide.subtitle}
              </p>
              <div className="pt-4">
                <Link
                  to={slide.link}
                  className="inline-block px-8 py-3.5 text-sm font-black uppercase tracking-wider duration-300 rounded-full bg-neos text-white shadow-xl hover:shadow-neos/20 hover:scale-105 active:scale-95 from-neos hover:scale-[1.01] cursor-pointer mt-2 hover:bg-orange-600"
                >
                  {slide.btnText}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute z-20 p-3 text-gray-400 transition-all duration-300 border rounded-full shadow-xl opacity-0 cursor-pointer left-4 bg-strong/40 border-neos/30 backdrop-blur-xs group-hover/hero:opacity-100 hover:text-neos hover:bg-strong hover:shadow-neos/20"
      >
        <LuChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-20 p-3 text-gray-400 transition-all duration-300 border rounded-full shadow-xl opacity-0 cursor-pointer right-4 bg-strong/40 border-neos/30 backdrop-blur-xs group-hover/hero:opacity-100 hover:text-neos hover:bg-strong hover:shadow-neos/20"
      >
        <LuChevronRight size={24} />
      </button>

      <div className="absolute z-20 flex gap-2 bottom-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === current ? "w-8 bg-neos" : "w-2 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;