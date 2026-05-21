import useFetch from "../../hooks/useFetch.js";

const Features = () => {
  const { data: features } = useFetch("/data/features.json");

  return (
    <section className="grid grid-cols-1 gap-8 py-16 text-center md:grid-cols-2 lg:grid-cols-3">
  {features?.map((item) => (
    <div 
      key={item.id} 
      className="p-8 transition-all duration-300 border shadow-xl border-neos/30 bg-strong group rounded-3xl hover:shadow-2xl hover:scale-105 hover:shadow-neos/15"
    >
      <div 
        className="flex justify-center mb-5 transition-transform duration-300 text-neos group-hover:scale-110"
        dangerouslySetInnerHTML={{ __html: item.iconSvg }}
      />
      
      <h3 className="mb-3 text-lg font-black tracking-wider text-gray-100 uppercase">
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-400">
        {item.description}
      </p>
    </div>
  ))}
</section>
  );
};

export default Features;