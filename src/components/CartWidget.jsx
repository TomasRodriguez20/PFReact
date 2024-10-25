import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartWidget.css';

export default function CartWidget() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="carrito">
      <Link to="/cart">
        <img className="carritoImg" src="./src/assets/carrito.jpg" alt="Cart" />
        <p>{totalItems > 0 ? totalItems : ''}</p>
      </Link>
    </div>
  );
}
