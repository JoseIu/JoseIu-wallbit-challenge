import { useContext } from 'react';
import { CartContext } from '../conext/cart/CartContext';

export const useCart = () => useContext(CartContext);
