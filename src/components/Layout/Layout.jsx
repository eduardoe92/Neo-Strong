import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
