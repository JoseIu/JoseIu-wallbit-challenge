import { createContext } from 'react';
import { ProductInCart } from '../../interfaces/product.interface';

interface CartContextProps {
  products: ProductInCart[];
  cartCreatedAt: Date | null;
  addToCart: (product: ProductInCart) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalProducts: () => number;
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);
