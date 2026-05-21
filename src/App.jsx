import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ItemListContainer from './pages/ItemListContainer';
import ItemDetail from './pages/ItemDetail';
import Contacto from './pages/Contacto';
import Login from './pages/login';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro'; 

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
          <Route path="carrito" element={<Carrito />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;