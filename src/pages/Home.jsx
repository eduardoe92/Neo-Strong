import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import MarqueeTags from "../components/home/MarqueeTags";

const Home = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <MarqueeTags />
      <Features />
    </div>
  );
};

export default Home;