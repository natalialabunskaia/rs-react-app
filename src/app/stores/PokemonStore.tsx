import { create } from 'zustand';
import type { PokemonByNameResponse } from '@api/pokemonApiTypes';

export type PokemonStoreState = {
  count: number;
  pokemons: PokemonByNameResponse[];
};

export type PokemonStoreActions = {
  addPokemon: (pokemon: PokemonByNameResponse) => void;
  removePokemon: (name: string) => void;
  removeAllPokemons: () => void;
};

export type PokemonStoreType = PokemonStoreState & PokemonStoreActions;

export const usePokemonStore = create<PokemonStoreType>((set) => ({
  pokemons: [],
  count: 0,

  addPokemon: (pokemon) =>
    set((state) => ({
      pokemons: [pokemon, ...state.pokemons],
      count: state.pokemons.length + 1,
    })),

  removePokemon: (name) =>
    set((state) => ({
      pokemons: state.pokemons.filter((pokemon) => name !== pokemon.name),
      count: state.pokemons.length - 1,
    })),

  removeAllPokemons: () => set(() => ({ pokemons: [], count: 0 })),
}));
