import { ProductInCart } from '../interfaces/product.interface';

export const searchProduct = (products: ProductInCart[], search: string): ProductInCart[] => {
  if (!search) return products;

  const searchLower = search.toLowerCase();

  return products.filter((product) => product.product.title.toLocaleLowerCase().includes(searchLower));
};

export const orderProducts = (products: ProductInCart[], sortBy: number): ProductInCart[] => {
  const productsFiltered = [...products];

  switch (sortBy) {
    case 1:
      return productsFiltered.sort((a, b) => a.quantity - b.quantity);
    case 2:
      return productsFiltered.sort((a, b) => b.quantity - a.quantity);
    case 3:
      return productsFiltered.sort((a, b) => a.product.price - b.product.price);
    case 4:
      return productsFiltered.sort((a, b) => b.product.price - a.product.price);
    case 5:
      return productsFiltered.sort((a, b) => a.product.price * a.quantity - b.product.price * b.quantity);
    case 6:
      return productsFiltered.sort((a, b) => b.product.price * b.quantity - a.product.price * a.quantity);
    default:
      return productsFiltered;
  }
};
