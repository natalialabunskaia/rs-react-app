import { useState, useEffect } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { usePokemonsData } from '@hooks/usePokemonsData';
import Search from '@components/Search';
import Results from '@components/Results';
import Spinner from '@components/Spinner';
import { ErrorBoundary } from '@components/ErrorBoundary';
import CrashButton from '@components/CrashButton';
import { Outlet, useSearchParams, useNavigate } from 'react-router';
import Counter from '@/app/components/counter/Counter';
import styles from '@pages/homePage/HomePage.module.css';

export const HomePage = () => {
  const { getLocalStorageValue, setLocalStorageValue } =
    useLocalStorage('input');
  const { getPokemons, results, requestStatus, error } = usePokemonsData();

  const storedSearch = getLocalStorageValue() || '';
  const [input, setInput] = useState(storedSearch);
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';

  const resetErrorBoundary = () => {
    setErrorBoundaryKey((prevState) => prevState + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') {
      return;
    }
    const trimmedInput = input.trim().toLowerCase();
    setLocalStorageValue(trimmedInput);
    setInput(trimmedInput);
    const params = new URLSearchParams();

    params.set('page', '1');

    if (trimmedInput) {
      params.set('search', trimmedInput);
    }

    navigate(`/?${params.toString()}`);
    resetErrorBoundary();
  };

  useEffect(() => {
    if (!search && storedSearch) {
      const params = new URLSearchParams();

      params.set('page', '1');
      params.set('search', storedSearch);

      setSearchParams(params, { replace: true });

      return;
    }

    getPokemons(search, Number(page));
  }, [search, page, searchParams, storedSearch, getPokemons, setSearchParams]);

  return (
    <main>
      <section className="container-fluid bg-dark text-white px-5 pt-3 pb-5">
        <Search
          searchTerm={input}
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
          <aside className={`col-4 ${styles.pokemonSidebar}`}>
            <Outlet context={{ pokemons: results }} />
            <Counter />
          </aside>
        </div>
      </div>
    </main>
  );
};
