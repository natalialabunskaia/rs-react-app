import { pokemonApiClient } from '../api/pokemonApiClient';
import { pokemonApiConfig } from '../config/api';
import type { ItemPokemon, ItemType, PokemonDescription } from '../utils/types';

export const pokeApiService = {
  getBySearchTerm: async (searchTerm: string) => {
    if (!searchTerm) {
      const data = await pokemonApiClient.getAllPokemons();
      return data.results.map((item: ItemPokemon) => item.name);
    }
    const data = await pokemonApiClient.getPokemonByType(searchTerm);
    return data.pokemon.slice(pokemonApiConfig.defaultOffset, pokemonApiConfig.defaultLimit)
      .map((item: ItemType) => item.pokemon.name);
  },

  getPokemonDescription: async (names: string[]) => {
    const results: PokemonDescription[] = [];
    for (const pokeName of names) {
      const data = await pokemonApiClient.getPokemonByName(pokeName);
      const pokemon = {
        name: data.name,
        imgUrl: data.sprites.front_default,
        description: data.description,
      };
      results.push(pokemon);
    }
    console.log('pokeApi Service return normalized description:', results)
    return results;
  },
};
