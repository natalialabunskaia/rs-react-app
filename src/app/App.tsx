import React from 'react';
import Search from './components/Search';
import Results from './components/Results';
import axios from 'axios';

type PokemonResult = {
  name: string;
  imgUrl: string;
  description: string;
};

type AppState = {
  searchTerm: string;
  results: PokemonResult[];
  isLoading: boolean;
  error: string | null;
};

type ItemPokemon = {
  url: string
}

type ItemType = {
  pokemon: ItemPokemon
}

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

    let urls: string[] = [];

    if (!searchTerm) {
      const path = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
      try {
        const res = await axios.get(path);
        urls = res.data.results.map((item: ItemPokemon) => item.url);
      } catch (error) {
        console.error('Error: render empty input', error);
      }
    } else {
      const path = `https://pokeapi.co/api/v2/type/${searchTerm}`;
      try {
        const res = await axios.get(path);
        urls = res.data.pokemon.slice(0, 20).map((item: ItemType) => item.pokemon.url);
      } catch (error) {
        console.error('Error: render pockemon types', error);
      }
    }
    const results: PokemonResult[] = [];
    for (const url of urls) {
      const res = await axios.get(url);
      const description = `Pokemon weight: ${res.data.weight} kg \n Pokemon height: ${res.data.height} m`;
      const pokemon = {
        name: res.data.name,
        imgUrl: res.data.sprites.front_default,
        description,
      };
      results.push(pokemon);
    }
    this.setState({ results });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('searchTerm', this.state.searchTerm.trim());
    this.getPokemons();
  };

  componentDidMount(): void {
    this.getPokemons();
  }

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
