import React from 'react';
import type { SearchProps } from '../utils/types';

export default class Search extends React.Component<SearchProps> {
  render() {
    const { searchTerm, onChange, onSubmit } = this.props;

    return (
      <>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-floating">
                <input
                  id="type-input"
                  autoFocus
                  type="text"
                  name="pokemon-type"
                  aria-label="pokemon-type"
                  className="form-control w-100"
                  placeholder="pokemon type"
                  autoComplete="off"
                  onChange={onChange}
                  value={searchTerm}
                />
                <label htmlFor="type-input">Enter Pokémon type</label>
              </div>
            </div>
            <div className="col-auto">
              <button
                type="submit"
                aria-label="search"
                className="h-100 btn btn-lg btn-primary px-sm-5"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <p className="mt-2 mb-0 text-secondary">
          Example: fighting, fire, electric, dragon, water, grass, ice, etc
        </p>
      </>
    );
  }
}
