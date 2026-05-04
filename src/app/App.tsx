import React from 'react';
import Search from './components/Search';
import Results from './components/Results';
import axios from 'axios';
import getErrorMessage from './utils/getErrorMessage';
import type {
  AppState,
  PokemonResult,
  ItemPokemon,
  ItemType,
} from './utils/types';
import SearchStatus from './components/SearchStatus';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CrashButton } from './components/CrashButton';

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      requestStatus: 'idle', // 'loading', 'success', 'error'
      error: null,
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
      error: null,
    });

    let urls: string[] = [];

    if (!searchTerm) {
      const path = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
      try {
        const res = await axios.get(path);
        urls = res.data.results.map((item: ItemPokemon) => item.url);
      } catch (error) {
        this.setState({
          error: getErrorMessage(error.code),
          requestStatus: 'error',
        });
        return;
      }
    } else {
      const path = `https://pokeapi.co/api/v2/type/${searchTerm}`;
      try {
        const res = await axios.get(path);
        urls = res.data.pokemon
          .slice(0, 20)
          .map((item: ItemType) => item.pokemon.url);
      } catch (error) {
        this.setState({
          error: getErrorMessage(error.code),
          requestStatus: 'error',
        });
        return;
      }
    }
    const results: PokemonResult[] = [];
    for (const url of urls) {
      try {
        const res = await axios.get(url);
        const description = `Pokemon weight: ${res.data.weight} kg \n Pokemon height: ${res.data.height} m`;
        const pokemon = {
          name: res.data.name,
          imgUrl: res.data.sprites.front_default,
          description,
        };
        results.push(pokemon);
      } catch (error) {
        this.setState({
          error: getErrorMessage(error.code),
          requestStatus: 'error',
        });
        return;
      }
    }
    this.setState({ results, requestStatus: 'success', error: null });
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
