import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ItemListContainer from "./pages/ItemListContainer";
import ItemDetail from "./pages/ItemDetail";
import Contacto from "./pages/Contacto";
import Login from "./pages/login";
import Carrito from "./pages/Carrito";
import Registro from "./pages/Registro";
import Favorites from "./pages/favorite";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardView from "./pages/admin/DashboardView";
import AdminProductsView from "./pages/admin/AdminProductsView";
import AdminOrdersView from "./pages/admin/AdminOrdersView";
import Checkout from "./pages/Checkout";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<ItemListContainer />} />
          <Route path="productos/:categoria" element={<ItemListContainer />} />
          <Route path="item/:id" element={<ItemDetail />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route element={<ProtectedRoute />}>
            <Route path="carrito" element={<Carrito />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardView />} />
            <Route path="products" element={<AdminProductsView />} />
            <Route path="orders" element={<AdminOrdersView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
