export type PokemonResult = {
  name: string;
  imgUrl: string;
  description: string;
};

export type AppState = {
  searchTerm: string;
  results: PokemonResult[];
  requestStatus: string;
  error: string | null;
  errorBoundaryKey: number
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