import { ProductInCart } from '../../interfaces/product.interface';
import { CartState } from './CartProvider';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: ProductInCart }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'CART_CREATE_AT' }
  | { type: 'REMOVE_CART_CREATE_AT' }
  | { type: 'CLEAR_CART' };

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const isProductInCart = state.products.find(
        (product) => product.product.id === action.payload.product.id,
      );
      if (isProductInCart) {
        const updatedProducts = state.products.map((product) =>
          isProductInCart.product.id === product.product.id
            ? { ...product, quantity: product.quantity + action.payload.quantity }
            : product,
        );

        return {
          ...state,
          products: updatedProducts,
        };
      }
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        products: state.products.filter((product) => product.product.id !== action.payload.id),
      };
    case 'CART_CREATE_AT':
      return {
        ...state,
        cartCreatedAt: new Date(),
      };
    case 'REMOVE_CART_CREATE_AT':
      return {
        ...state,
        cartCreatedAt: null,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};
