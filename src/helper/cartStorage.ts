import { ProductInCart } from '../interfaces/product.interface';

const CART_KEY = 'cart';
const CART_CREATED_AT_KEY = 'cartCreatedAt';

export const getProductFromStorage = () => {
  const products = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as ProductInCart[];
  return products;
};

export const addProductToStorage = (product: ProductInCart) => {
  const products = getProductFromStorage();

  const productInCart = products.find((productInCart) => productInCart.product.id === product.product.id);

  if (productInCart) {
    const updatedProducts = products.map((productInCart) =>
      productInCart.product.id === product.product.id
        ? { ...productInCart, quantity: productInCart.quantity + product.quantity }
        : productInCart,
    );

    localStorage.setItem(CART_KEY, JSON.stringify(updatedProducts));
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify([...products, product]));
};

export const removeProductStorage = (id: number) => {
  const products = getProductFromStorage();

  const productsFilteres = products.filter((product) => product.product.id !== id);

  localStorage.setItem(CART_KEY, JSON.stringify(productsFilteres));
};

export const addCartCreateAt = () => {
  localStorage.setItem(CART_CREATED_AT_KEY, new Date().toISOString());
};

export const removeCartCreateAt = () => {
  localStorage.removeItem(CART_CREATED_AT_KEY);
};

export const getCartCreateAt = () => {
  const cartCreatedAt = localStorage.getItem(CART_CREATED_AT_KEY);

  return cartCreatedAt ? new Date(cartCreatedAt) : null;
};
