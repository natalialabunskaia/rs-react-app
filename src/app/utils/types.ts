export type PokemonResult = {
  name: string;
  imgUrl: string;
  description: string;
};

export type AppState = {
  searchTerm: string;
  results: PokemonResult[];
  isLoading: boolean;
  error: string | null;
};

export type ItemPokemon = {
  url: string;
};

export type ItemType = {
  pokemon: ItemPokemon;
};

export type ResultProps = {
  pokemons: PokemonResult[];
  searchTerm: string;
};

export type SearchProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  error: string;
};

