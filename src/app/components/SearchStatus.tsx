import type { SearchStatusProps } from '../utils/types';

const SearchStatus  = ({requestStatus, error }: SearchStatusProps) => {

    if (requestStatus === 'loading') {
      return (
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }
    if (requestStatus === 'error') {
      return <p className="mt-2 mb-0 text-danger">{error}</p>;
    }
    
    return null;
  }

export default SearchStatus;