import './App.scss';
import { AddToCart, Cart } from './components';

export const Shop = () => {
  return (
    <main className="shop wrapper">
      <h1 className="title">
        <img src="./tuki-1.webp" className="title__icon" alt="tuki image" />
        Tienda - El topo
      </h1>
      <div className="shop__container">
        <AddToCart />
        <Cart />
      </div>
    </main>
  );
};
