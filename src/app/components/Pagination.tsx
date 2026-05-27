import { NavLink, useSearchParams } from 'react-router';
import type { RequestStatusProps } from '@utils/types';

export const Pagination = ({ status }: RequestStatusProps) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search');

  const getPageUrl = (nextPage: number): string => {
    const params = new URLSearchParams();

    params.set('page', String(nextPage));

    if (search) {
      params.set('search', search);
    }

    return `/?${params.toString()}`;
  };

  const nextPage = (): string => getPageUrl(page + 1);

  const prevPage = (): string => getPageUrl(page > 1 ? page - 1 : 1);

  if (status !== 'success') {
    return null;
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <NavLink to={prevPage()} className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </NavLink>
        </li>
        <li className="page-item">
          <NavLink to={nextPage()} className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
