import React from 'react';
import Search from './components/Search';
import Results from './components/Results';
import getErrorMessage from './utils/getErrorMessage';
import type { AppState } from './utils/types';
import SearchStatus from './components/SearchStatus';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CrashButton } from './components/CrashButton';
import { pokeApiService } from './service/pokeApiService';

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      requestStatus: 'idle',
      error: '',
      errorBoundaryKey: 0,
    };
  }

  resetErrorBoundary = () => {
    this.setState((prevState) => ({
      errorBoundaryKey: prevState.errorBoundaryKey + 1,
    }));
  };

  getPokemons = async () => {
    const { searchTerm } = this.state;

    this.setState({
      requestStatus: 'loading',
      error: '',
    });

    try {
      const names = await pokeApiService.getBySearchTerm(searchTerm);
      const results = await pokeApiService.getPokemonDescription(names);
      this.setState({ results, requestStatus: 'success', error: '' });
    } catch (error) {
      this.setState({
        error: getErrorMessage(error),
        requestStatus: 'error',
      });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const { searchTerm } = this.state;
    e.preventDefault();
    const trimmedValue = searchTerm.trim().toLowerCase();
    const localStorageValue = localStorage.getItem('searchTerm');

    if (trimmedValue === localStorageValue) {
      return;
    }

    this.setState({ searchTerm: trimmedValue }, () => {
      localStorage.setItem('searchTerm', trimmedValue);
      this.resetErrorBoundary();
      this.getPokemons();
    });
  };

  componentDidMount(): void {
    this.getPokemons();
  }

  render() {
    return (
      <main>
        <section className="container-fluid bg-dark text-white p-5">
          <Search
            searchTerm={this.state.searchTerm}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            error={this.state.error}
          />
          <SearchStatus
            requestStatus={this.state.requestStatus}
            error={this.state.error}
          ></SearchStatus>
        </section>
        <ErrorBoundary key={this.state.errorBoundaryKey}>
          <Results
            pokemons={this.state.results}
            searchTerm={this.state.searchTerm}
          />
          <CrashButton />
        </ErrorBoundary>
      </main>
    );
  }
}
