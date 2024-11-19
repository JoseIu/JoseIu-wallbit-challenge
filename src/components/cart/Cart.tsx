import { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { currencyFormat, processProductsToDisplay } from '../../helper';
import { useCart, useFilters } from '../../hook';
import { CartFilters } from '../cart-filters/CartFilters';
import { CartPagination } from '../cart-pagination/CartPagination';
import { ProductsTable } from '../products-table/ProductsTable';
import './cart.scss';

export const Cart = () => {
  const { products, cartCreatedAt, getTotalPrice, getTotalProducts } = useCart();
  const { search, sortBy, setOrder, setSearch } = useFilters();

  const [pagination, setPagination] = useState({ page: 1, itemsPerPage: 5 });

  const setPage = (page: number) => setPagination({ ...pagination, page });
  const { productsPaginated, totalPages } = processProductsToDisplay(
    products,
    search,
    sortBy,
    pagination.page,
    pagination.itemsPerPage,
  );

  return (
    <section className="cart">
      <header className="cart__header">
        <h3 className="cart__title">
          <IoCartOutline className="cart__icon" size={30} />
          Carrito de la compra
        </h3>
        {cartCreatedAt && <span className="cart__create-at">Creado: {cartCreatedAt?.toLocaleString()}</span>}
      </header>

      <span className="cart__total-products">Artículos en el carrito: {getTotalProducts()}</span>

      <CartFilters search={search} sortBy={sortBy} setSearch={setSearch} setOrder={setOrder} />

      {!products.length ? (
        <p className="cart__empty-message">
          No tienes productos en el carrito aún, prueba agregando con su ID y la cantidad que deseas 😁
        </p>
      ) : (
        <>
          <ProductsTable products={productsPaginated} />
          <div className="cart__sumary">
            <CartPagination page={pagination.page} totalPages={totalPages} setPage={setPage} />
            <span className="cart__total">TOTAL: {currencyFormat(getTotalPrice())}</span>
          </div>
        </>
      )}
    </section>
  );
};
