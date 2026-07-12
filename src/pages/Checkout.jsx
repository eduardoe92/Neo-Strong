import { useEffect, useState } from "react";
import CheckoutForm from "../components/shop/CheckoutForm";
import OrderSummary from "../components/shop/OrderSummary";
import { cartService } from "../services/cartService";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await cartService.getCart();
        setCartItems(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        console.error("Error al cargar carrito", err);
      }
    };
    fetchCart();
  }, []);

return (
    <div className="container max-w-6xl px-4 py-12 mx-auto">
      <h2 className="mb-12 text-3xl font-black text-center text-white uppercase">
        Finalizar <span className="text-neos">Compra</span>
      </h2>
      
      {/* Items start alinea ambos componentes en la parte superior */}
      <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
        <CheckoutForm />
        <OrderSummary cartItems={cartItems} />
      </div>
    </div>
  );
};

export default Checkout;