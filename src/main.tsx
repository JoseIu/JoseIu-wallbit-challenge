import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './conext/cart/CartProvider';
import './index.scss';
import { Shop } from './Shop';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Shop />
      <Toaster position="top-center" />
    </CartProvider>
  </StrictMode>,
);
