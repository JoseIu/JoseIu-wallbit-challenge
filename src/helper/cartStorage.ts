import { ProductInCart } from '../interfaces/product.interface';

const CART_KEY = 'cart';

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
export const addProductToStorageV2 = (state: ProductInCart[]) => {
  localStorage.removeItem(CART_KEY);
  localStorage.setItem(CART_KEY, JSON.stringify(state));
};

export const removeProductStorage = (id: number) => {
  const products = getProductFromStorage();

  const productsFilteres = products.filter((product) => product.product.id !== id);

  localStorage.setItem(CART_KEY, JSON.stringify(productsFilteres));
};
