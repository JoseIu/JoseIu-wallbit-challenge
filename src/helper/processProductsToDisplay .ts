import { useMemo } from 'react';
import { ProductInCart } from '../interfaces/product.interface';
import { orderProducts, searchProduct } from './cartFilters';

export const paginateProducts = (products: ProductInCart[], page: number, itemsPerPage: number) => {
  //(1 -1 = 0) * 10 = 0
  const startIndex = (page - 1) * itemsPerPage;
  //0 + 5 = 5
  const endIndex = startIndex + itemsPerPage;

  return products.slice(startIndex, endIndex);
};

export const processProductsToDisplay = (
  products: ProductInCart[],
  search: string,
  sortBy: number,
  page: number,
  itemsPerPage: number,
) => {
  const { productsFiltered, totalPages } = useMemo(() => {
    let productsFiltered = searchProduct(products, search.trim());
    productsFiltered = orderProducts(productsFiltered, sortBy);

    const totalPages = Math.ceil(productsFiltered.length / itemsPerPage);
    return { productsFiltered, totalPages };
  }, [products, search, sortBy]);

  const productsPaginated = useMemo(() => {
    const productsPaginated = paginateProducts(productsFiltered, page, itemsPerPage);
    return productsPaginated;
  }, [productsFiltered, page]);

  return { productsPaginated, totalPages };
};
