import { useReducer } from 'react';
import { addProductToStorage, getProductFromStorage, removeProductStorage } from '../../helper';
import { ProductInCart } from '../../interfaces/product.interface';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

type Props = {
  children: React.ReactNode;
};

export interface CartState {
  products: ProductInCart[];
}

const INITIAL_STATE: CartState = {
  products: [],
};

const init = (): CartState => {
  const products = getProductFromStorage();

  return { products };
};

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE, init);

  // useEffect(() => {
  //   addProductToStorageV2(state.products);
  // }, [state.products]);

  const addToCart = (product: ProductInCart) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
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
