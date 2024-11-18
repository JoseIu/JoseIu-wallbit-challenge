import { useMemo } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { currencyFormat, orderProducts, searchProduct } from '../../helper';
import { useCart, useFilters } from '../../hook';
import { CartFilters } from '../cart-filters/CartFilters';
import { ProductsTable } from '../products-table/ProductsTable';
import './cart.scss';

export const Cart = () => {
  const { products, getTotalPrice, getTotalProducts } = useCart();

  const { search, sortBy, setOrder, setSearch } = useFilters();

  const productsFiltered = useMemo(() => {
    let productsFiltered = searchProduct(products, search.trim());
    productsFiltered = orderProducts(productsFiltered, sortBy);
    return productsFiltered;
  }, [products, search, sortBy]);

  return (
    <section className="cart">
      <h3 className="cart__title">
        <IoCartOutline className="cart__icon" size={30} />
        Carrito de la compra
      </h3>

      <span className="cart__products">Artículos en el carrito: {getTotalProducts()}</span>

      <CartFilters search={search} sortBy={sortBy} setSearch={setSearch} setOrder={setOrder} />

      {!products.length ? (
        <p>
          No tienes productos en el carrito aún, prueba agregando arriba con su ID y la cantidad que deseas
          ingresar 😁
        </p>
      ) : (
        <>
          <ProductsTable products={productsFiltered} />

          <span className="cart__total">TOTAL: {currencyFormat(getTotalPrice())}</span>
        </>
      )}
    </section>
  );
};
