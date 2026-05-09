import React from 'react';
import type { SearchStatusProps } from '../utils/types';

export default class SearchStatus extends React.Component<SearchStatusProps>{
  render() {
    const { requestStatus, error } = this.props;

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
}
