import { MouseEvent } from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const MAX_BUTTONS = 5;

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  const pages = getVisiblePages(currentPage, totalPages);

  const handlePageClick =
    (page: number) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (page === currentPage || page < 1 || page > totalPages) return;
      setCurrentPage(page);
    };

  return (
    <ul className={css.pagination} aria-label="Pagination">
      <li className={currentPage === 1 ? css.disabled : undefined}>
        <a href="#" onClick={handlePageClick(currentPage - 1)} aria-label="Previous page">
          &lt;
        </a>
      </li>

      {pages.map((page) => (
        <li key={page} className={page === currentPage ? css.active : undefined}>
          <a
            href="#"
            onClick={handlePageClick(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={currentPage === totalPages ? css.disabled : undefined}>
        <a href="#" onClick={handlePageClick(currentPage + 1)} aria-label="Next page">
          &gt;
        </a>
      </li>
    </ul>
  );
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= MAX_BUTTONS) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const start = Math.max(1, Math.min(currentPage - 2, totalPages - MAX_BUTTONS + 1));
  const end = Math.min(totalPages, start + MAX_BUTTONS - 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
