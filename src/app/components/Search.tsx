import React from 'react';

type SearchProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  error: string;
};

export default class Search extends React.Component<SearchProps> {
  render() {
    const { searchTerm, onChange, onSubmit, error } = this.props;

    return (
      <section className="container-fluid bg-dark text-white p-5">
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-floating">
                <input
                  id="type-input"
                  autoFocus
                  type="text"
                  required
                  name="pokemon-type"
                  aria-label="pokemon-type"
                  className="form-control w-100"
                  placeholder="pokemon type"
                  autoComplete="off"
                  onChange={onChange}
                  value={searchTerm}
                />
                <label htmlFor="type-input">Enter Pokemon type</label>
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
          Example: fighting, fire, electric, dragon, etc
        </p>
        {error && <p className="mt-2 mb-0 text-danger">{error}</p>}
      </section>
    );
  }
}
