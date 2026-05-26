import { beforeEach, describe, expect, it } from 'vitest';
import { usePokemonStore } from '@stores/PokemonStore';
import type { PokemonByNameResponse } from '@api/pokemonApiTypes';

const pikachu = {
  name: 'pikachu',
} as PokemonByNameResponse;

const bulbasaur = {
  name: 'bulbasaur',
} as PokemonByNameResponse;

beforeEach(() => {
  usePokemonStore.setState({
    pokemons: [],
    count: 0,
  });
});

describe('usePokemonStore', () => {
  it('should have initial state', () => {
    const state = usePokemonStore.getState();

    expect(state.pokemons).toEqual([]);
    expect(state.count).toBe(0);
  });

  it('should add pokemon to the beginning of the list', () => {
    usePokemonStore.getState().addPokemon(pikachu);
    usePokemonStore.getState().addPokemon(bulbasaur);

    const state = usePokemonStore.getState();

    expect(state.pokemons).toEqual([bulbasaur, pikachu]);
    expect(state.count).toBe(2);
  });

  it('should remove pokemon by name', () => {
    usePokemonStore.getState().addPokemon(pikachu);
    usePokemonStore.getState().addPokemon(bulbasaur);

    usePokemonStore.getState().removePokemon('pikachu');

    const state = usePokemonStore.getState();

    expect(state.pokemons).toEqual([bulbasaur]);
    expect(state.count).toBe(1);
  });

  it('should remove all pokemons', () => {
    usePokemonStore.getState().addPokemon(pikachu);
    usePokemonStore.getState().addPokemon(bulbasaur);

    usePokemonStore.getState().removeAllPokemons();

    const state = usePokemonStore.getState();

    expect(state.pokemons).toEqual([]);
    expect(state.count).toBe(0);
  });
});
