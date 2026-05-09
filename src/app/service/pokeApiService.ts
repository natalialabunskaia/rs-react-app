import { pokemonApiClient } from '../api/pokemonApiClient';
import { pokemonApiConfig } from '../config/api';
import type { ItemPokemon, ItemType, PokemonDescription, PokemonApiData } from '../utils/types';

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
      const data: PokemonApiData = await pokemonApiClient.getPokemonByName(pokeName);
      const pokemon: PokemonDescription = {
        name: data.name,
        imgUrl: data.sprites.front_default,
        description: `type - ${data.types.map((slot) => slot.type.name).join(', ')}; weight - ${data.weight}; height - ${data.height}`
      };
      results.push(pokemon);
    }
    console.log('pokeApi Service return normalized description:', results)
    return results;
  },
};
