import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const MAX_BUTTONS = 5;

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  const handlePageChange = ({ selected }: { selected: number }) => {
    const page = selected + 1; // react-paginate is zero-based
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageChange}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      pageRangeDisplayed={MAX_BUTTONS}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}
