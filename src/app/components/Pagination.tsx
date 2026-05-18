  import { useSearchParams } from 'react-router';
  import type { RequestStatusProps } from '../utils/types';
  import type { MouseEvent } from 'react';

  export const Pagination = ({ status }: RequestStatusProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page'));

    const handleClickNext = (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setSearchParams({ page: String(page + 1) });
    };

    const handleClickPrev = (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (page > 1) {
        setSearchParams({ page: String(page - 1) });
      }
    };

    if (status !== 'success') {
      return null;
    }
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a
              onClick={handleClickPrev}
              className="page-link"
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={handleClickNext}
              className="page-link"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };
