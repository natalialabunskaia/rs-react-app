import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { usePokemonsData } from './hooks/usePokemonsData';
import Search from './components/Search';
import Results from './components/Results';
import SearchStatus from './components/SearchStatus';
import { ErrorBoundary } from './components/ErrorBoundary';
import CrashButton from './components/CrashButton';

const App = () => {
  const { getValue, setValue } = useLocalStorage('searchTerm');
  const { getPokemons, results, requestStatus, error } = usePokemonsData();

  const [searchTerm, setSearchTerm] = useState(getValue() || '');
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);

  const resetErrorBoundary = () => {
    setErrorBoundaryKey((prevState) => prevState + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = searchTerm.trim().toLowerCase();
    const localStorageValue = getValue();

    if (trimmedValue === localStorageValue) {
      return;
    }

    setSearchTerm(trimmedValue);
    setValue(trimmedValue);
    resetErrorBoundary();
    getPokemons(trimmedValue);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPokemons(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="container-fluid bg-dark text-white p-5">
        <Search
          searchTerm={searchTerm}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <SearchStatus
          requestStatus={requestStatus}
          error={error}
        ></SearchStatus>
      </section>
      <ErrorBoundary key={errorBoundaryKey}>
        <Results pokemons={results} />
        <CrashButton />
      </ErrorBoundary>
    </main>
  );
};

export default App;
