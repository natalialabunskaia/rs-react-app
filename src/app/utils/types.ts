export type PokemonDetailsType = {
  name: string;
  imgUrl: string;
  description: string;
  details?: string;
};
export type PokemonCardProps = {
  pokemon: PokemonDetailsType;
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

export type ItemPokemon = {
  url: string;
  name: string;
};

export type ItemType = {
  pokemon: ItemPokemon;
};

export type ResultProps = {
  pokemons: PokemonDetailsType[];
  status: RequestStatus;
};
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export type RequestStatusProps = {
  status: RequestStatus;
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

export type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
