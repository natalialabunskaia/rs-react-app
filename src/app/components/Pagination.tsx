import { NavLink, useSearchParams, useMatch } from 'react-router';
import type { RequestStatusProps } from '@utils/types';

export const Pagination = ({ status }: RequestStatusProps) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page'));
  const search = searchParams.get('search');
  const isDetailsOpen = useMatch('/details/:id');

  const nextPage = (page: number): string => {
   const next = page + 1;
    if (!isDetailsOpen) {
      return `?search=${search}&page=${String(next)}`;
    }
    return `/?search=${search}&page=${String(next)}`;
  };

  const prevPage = (page: number): string => {
    const prev = page > 1 ? page - 1 : 1;
    if (!isDetailsOpen) {
      return `?search=${search}&page=${String(prev)}`;
    }
    return `/?search=${search}&page=${String(prev)}`;
  };

  if (status !== 'success') {
    return null;
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <NavLink
            to={prevPage(page)}
            className="page-link"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </NavLink>
        </li>
        <li className="page-item">
          <NavLink
            to={nextPage(page)}
            className="page-link"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
