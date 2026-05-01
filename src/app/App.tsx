import React from 'react';
import Search from './components/Search';
import Results from './components/Results';
import axios from 'axios';

type PokemonResult = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

type AppState = {
  searchTerm: string;
  results: PokemonResult[];
  isLoading: boolean;
  error: string | null;
};

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      isLoading: false,
      error: null,
    };
  }

  getPokemons = async () => {
    const { searchTerm } = this.state;
    const path = `https://pokeapi.co/api/v2/type/${searchTerm}`;
    try {
      const res = await axios.get(path);
      this.setState({ results: res.data.pokemon }
      );
    } catch (error) {
      console.error('Error: this pokemon type does not exist', error);
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value }
    );
  };

  handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('searchTerm', this.state.searchTerm.trim())
    this.getPokemons();
  };

  render() {
    return (
      <main>
        <Search
          searchTerm={this.state.searchTerm}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <Results
          pokemons={this.state.results}
          searchTerm={this.state.searchTerm}
        />
      </main>
    );
  }
}
