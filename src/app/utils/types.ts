export type PokemonDetails = {
  name: string;
  imgUrl: string;
  description: string;
};
export type PokemonCardProps = {
  pokemon: PokemonDetails;
};

export type PokemonTypeSlot = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonApiData = {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: PokemonTypeSlot[];
};

export type AppState = {
  searchTerm: string;
  results: PokemonDetails[];
  requestStatus: string;
  error: string;
  errorBoundaryKey: number
};

export type ItemPokemon = {
  url: string;
  name: string
};

export type ItemType = {
  pokemon: ItemPokemon;
};

export type ResultProps = {
  pokemons: PokemonDetails[];
};

export type SearchProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

export type SearchStatusProps = {
  requestStatus: string;
  error: string;
};

export type CrashButtonState = {
  error: null | number;
};

export type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};