import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import './cartPagination.scss';

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const CartPagination = ({ page, setPage, totalPages }: Props) => {
  const isinFirstPage = page === 1 && 'disabled';
  const insInLastPage = page === totalPages && 'disabled';
  return (
    <div className="pagination">
      <button className={`pagination__btn ${isinFirstPage}`} onClick={() => setPage(page - 1)}>
        <IoChevronBackOutline size={20} />
      </button>
      {page} / {totalPages}
      <button className={`pagination__btn ${insInLastPage}`} onClick={() => setPage(page + 1)}>
        <IoChevronForwardOutline size={20} />
      </button>
    </div>
  );
};
