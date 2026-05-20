import { useState, useEffect } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { usePokemonsData } from '@hooks/usePokemonsData';
import Search from '@components/Search';
import Results from '@components/Results';
import Spinner from '@components/Spinner';
import { ErrorBoundary } from '@components/ErrorBoundary';
import CrashButton from '@components/CrashButton';
import { Outlet, useSearchParams, useNavigate } from 'react-router';

export const HomePage = () => {
  const { getValue, setValue } = useLocalStorage('searchTerm');
  const { getPokemons, results, requestStatus, error } = usePokemonsData();

  const [searchTerm, setSearchTerm] = useState(getValue() || '');
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchValue = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';

  const resetErrorBoundary = () => {
    setErrorBoundaryKey((prevState) => prevState + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = searchTerm.trim().toLowerCase();
    setValue(trimmedValue);
    setSearchTerm(trimmedValue);
    navigate(`/?search=${trimmedValue}&page=1`);
    resetErrorBoundary();
  };

  useEffect(() => {
    if (!page) {
      setSearchParams({ search: searchValue, page: '1' });
      return;
    }
    getPokemons(searchValue, Number(searchParams.get('page') || '1'));
  }, [searchValue, page, searchParams, getPokemons, setSearchParams]);

  return (
    <main>
      <section className="container-fluid bg-dark text-white px-5 pt-3 pb-5">
        <Search
          searchTerm={searchTerm}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Spinner requestStatus={requestStatus} error={error}></Spinner>
      </section>
      <div className="container-fluid">
        <div className="row">
          <section className="col-8">
            <ErrorBoundary key={errorBoundaryKey}>
              <Results pokemons={results} status={requestStatus} />
              <CrashButton />
            </ErrorBoundary>
          </section>
          <aside className="col-4 py-5">
            <Outlet context={{ pokemons: results }} />
          </aside>
        </div>
      </div>
    </main>
  );
};
