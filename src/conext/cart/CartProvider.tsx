import { useEffect, useReducer } from 'react';
import {
  addCartCreateAt,
  addProductToStorage,
  getCartCreateAt,
  getProductFromStorage,
  removeProductStorage,
} from '../../helper';
import { ProductInCart } from '../../interfaces/product.interface';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

type Props = {
  children: React.ReactNode;
};

export interface CartState {
  products: ProductInCart[];
  cartCreatedAt: Date | null;
}

const INITIAL_STATE: CartState = {
  products: [],
  cartCreatedAt: null,
};

const init = (): CartState => {
  const products = getProductFromStorage();
  const cartCreatedAt = getCartCreateAt();

  return { products, cartCreatedAt: cartCreatedAt ? new Date(cartCreatedAt) : null };
};

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE, init);

  useEffect(() => {
    if (state.products.length) return;
    dispatch({ type: 'REMOVE_CART_CREATE_AT' });
  }, [state.products]);

  const addToCart = (product: ProductInCart) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });

    if (!state.cartCreatedAt) {
      dispatch({ type: 'CART_CREATE_AT' });
      addCartCreateAt();
    }
    addProductToStorage(product);
  };

  const removeProduct = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });

    removeProductStorage(id);
  };

  const getTotalPrice = (): number => {
    const producst = state.products;
    const total = producst.reduce((total, product) => product.quantity * product.product.price + total, 0);

    return total;
  };
  const getTotalProducts = (): number => {
    const producst = state.products;
    const total = producst.reduce((total, product) => product.quantity + total, 0);

    return total;
  };
  return (
    <CartContext.Provider value={{ ...state, addToCart, removeProduct, getTotalPrice, getTotalProducts }}>
      {children}
    </CartContext.Provider>
  );
};
