import { pokemonApiClient } from '../api/pokemonApiClient';
import { pokemonApiConfig } from '../config/api';
import type {
  ItemPokemon,
  ItemType,
  PokemonDetailsType,
  PokemonApiData,
} from '../utils/types';

export const pokeApiService = {
  getBySearchTerm: async (searchTerm: string, page: number) => {
    const offset = (page - 1) * pokemonApiConfig.defaultLimit;

    if (!searchTerm) {
      const data = await pokemonApiClient.getAllPokemons(offset);
      return data.results.map((item: ItemPokemon) => item.name);
    }
    const data = await pokemonApiClient.getPokemonByType(searchTerm);
    return data.pokemon
      .slice(offset, offset + pokemonApiConfig.defaultLimit)
      .map((item: ItemType) => item.pokemon.name);
  },

  getPokemonDetails: async (names: string[]): Promise<PokemonDetailsType[]> => {
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
