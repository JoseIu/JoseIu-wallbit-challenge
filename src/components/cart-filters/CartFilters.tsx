import { IoChevronDownOutline } from 'react-icons/io5';
import './cartFilters.scss';
type Props = {
  search: string;
  sortBy: number;
  setSearch: (value: string) => void;
  setOrder: (sortBy: number) => void;
};

export const CartFilters = ({ search, sortBy, setSearch, setOrder }: Props) => {
  return (
    <div className="filters">
      <input
        className="filters__search"
        type="search"
        name="search"
        id="searc"
        placeholder="Buscar nombre del producto..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="filters__sort">
        <select
          className="filters__sort-select"
          value={sortBy}
          name="order"
          id="order"
          onChange={(event) => setOrder(+event.target.value)}
        >
          <option className="filters__sort-option" value="0">
            Por defecto
          </option>
          <option className="filters__sort-option" value="1">
            Cantidad ASC
          </option>
          <option className="filters__sort-option" value="2">
            Cantidad DESC
          </option>
          <option className="filters__sort-option" value="3">
            Precio U. ASC
          </option>
          <option className="filters__sort-option" value="4">
            Precio U. DESC
          </option>
          <option className="filters__sort-option" value="5">
            Precio T. ASC
          </option>
          <option className="filters__sort-option" value="6">
            Precio T. DESC
          </option>
        </select>

        <IoChevronDownOutline size={20} className="filters__sort-icon" />
      </div>
    </div>
  );
};
