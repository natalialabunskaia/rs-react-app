import { pokemonApiClient } from '../api/pokemonApiClient';
import { pokemonApiConfig } from '../config/api';
import type {
  ItemPokemon,
  ItemType,
  PokemonDetails,
  PokemonApiData,
} from '../utils/types';

export const pokeApiService = {
  getBySearchTerm: async (searchTerm: string) => {
    if (!searchTerm) {
      const data = await pokemonApiClient.getAllPokemons();
      return data.results.map((item: ItemPokemon) => item.name);
    }
    const data = await pokemonApiClient.getPokemonByType(searchTerm);
    return data.pokemon
      .slice(pokemonApiConfig.defaultOffset, pokemonApiConfig.defaultLimit)
      .map((item: ItemType) => item.pokemon.name);
  },

  getPokemonDetails: async (names: string[]): Promise<PokemonDetails[]> => {
    const promises = names.map((pokeName) =>
      pokemonApiClient.getPokemonByName(pokeName)
    );

    const results = await Promise.allSettled(promises);

    return results.map((result, index) => {
      if (result.status === 'rejected') {
        return {
          name: names[index],
          imgUrl: '',
          description: 'Failed to fetch details',
        };
      }
      const data: PokemonApiData = result.value;
      return {
        name: data.name,
        imgUrl: data.sprites.front_default,
        description: `${data.types.map((slot) => slot.type.name).join(', ')}`,
        details: `Height: ${data.height}, Weight: ${data.weight}`,
      };
    });
  },
};
