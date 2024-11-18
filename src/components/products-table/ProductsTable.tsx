import { IoTrashBinOutline } from 'react-icons/io5';
import { currencyFormat } from '../../helper';
import { useCart } from '../../hook/useCart';
import { ProductInCart } from '../../interfaces/product.interface';
import './productsTable.scss';

type Props = {
  products: ProductInCart[];
};

export const ProductsTable = ({ products }: Props) => {
  const { removeProduct } = useCart();

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          <tr className="table__head-tr">
            <th className="table__head-th">Cant</th>
            <th className="table__head-th">Nombre</th>
            <th className="table__head-th">Precio U.</th>
            <th className="table__head-th">Precio T.</th>
            <th className="table__head-th">Foto</th>
            <th className="table__head-th">Acciones</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {products.map((product) => (
            <tr className="table__body-tr" key={product.product.id}>
              <td className="table__body-td">{product.quantity}</td>
              <td className="table__body-td">{product.product.title}</td>
              <td className="table__body-td">{currencyFormat(product.product.price)}</td>
              <td className="table__body-td">{currencyFormat(product.product.price * product.quantity)}</td>
              <td className="table__body-td">
                <img className="table__body-img" src={product.product.image} alt={product.product.title} />
              </td>
              <td className="table__body-td">
                <button className="table__body-btn" aria-label="eliminar producto del carrito">
                  <IoTrashBinOutline size={25} onClick={() => removeProduct(product.product.id)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
