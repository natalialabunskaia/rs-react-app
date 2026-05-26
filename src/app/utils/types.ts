import type { PokemonByNameResponse } from '../api/pokemonApiTypes';

export type PokemonCardProps = {
  pokemon: PokemonByNameResponse;
  handleChoose: (
    e: React.ChangeEvent<HTMLInputElement>,
    pokemon: PokemonByNameResponse
  ) => void;
  isChecked: (
    pokemons: PokemonByNameResponse[],
    pokemon: PokemonByNameResponse
  ) => boolean;
};

export type PokemonListProps = {
  pokemons: PokemonByNameResponse[];
  handleChoose: (
    e: React.ChangeEvent<HTMLInputElement>,
    pokemon: PokemonByNameResponse
  ) => void;
  isChecked: (
    pokemons: PokemonByNameResponse[],
    pokemon: PokemonByNameResponse
  ) => boolean;
};

export type ResultProps = {
  pokemons: PokemonByNameResponse[];
  status: RequestStatus;
  handleChoose: (
    e: React.ChangeEvent<HTMLInputElement>,
    pokemon: PokemonByNameResponse
  ) => void;
  isChecked: (
    pokemons: PokemonByNameResponse[],
    pokemon: PokemonByNameResponse
  ) => boolean;
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
