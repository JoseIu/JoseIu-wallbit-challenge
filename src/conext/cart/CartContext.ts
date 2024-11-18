import { createContext } from 'react';
import { ProductInCart } from '../../interfaces/product.interface';

interface CartContextProps {
  products: ProductInCart[];
  addToCart: (product: ProductInCart) => void;
  removeProduct: (id: number) => void;
  getTotalPrice: () => number;
  getTotalProducts: () => number;
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);
