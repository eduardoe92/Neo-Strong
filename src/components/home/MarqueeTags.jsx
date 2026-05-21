import tagsData from "../../../public/data/marqueeTags.json";

const MarqueeTags = () => {
  const listaDuplicada = [
    ...tagsData,
    ...tagsData,
    ...tagsData,
    ...tagsData,
    ...tagsData,
    ...tagsData,
    ...tagsData,
  ];

  return (
    <div className="relative z-40 w-full py-6 mb-0 overflow-hidden select-none bg-fondo before:absolute before:left-0 before:top-0 before:z-50 before:h-full before:w-24 before:bg-linear-to-r before:from-fondo before:to-transparent before:pointer-events-none after:absolute after:right-0 after:top-0 after:z-50 after:h-full after:w-24 after:bg-linear-to-l after:from-fondo after:to-transparent after:pointer-events-none">
      <div className="flex w-full">
        <div className="flex gap-6 px-4 animate-marquee whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
          {listaDuplicada.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-block px-4 py-1.5 text-s font-black tracking-widest text-neos bg-neos/10 border border-neos/30/30 rounded-full uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTags;
