import axios from 'axios';
import queryString from 'query-string';
import { pokemonApiConfig } from '@config/api';
import type { AllPokemonRespoonse, PokemonByNameResponse, PokemonTypeResponse } from './pokemonApiTypes';

const instance = axios.create({
  baseURL: pokemonApiConfig.baseUrl,
});

export const pokemonApiClient = {
  getAllPokemons: async (
    offset: number = pokemonApiConfig.defaultOffset
  ): Promise<AllPokemonRespoonse> => {
    const query = queryString.stringify({
      limit: pokemonApiConfig.defaultLimit,
      offset,
    });

    const res = await instance.get(
      `${pokemonApiConfig.endpoints.pokemon}?${query}`
    );
    return res.data;
  },

  getPokemonByType: async (type: string): Promise<PokemonTypeResponse> => {
    const res = await instance.get(
      `${pokemonApiConfig.endpoints.type}/${type}`
    );
    return res.data;
  },

  getPokemonByName: async (
    pokemonName: string
  ): Promise<PokemonByNameResponse> => {
    const res = await instance.get(
      `${pokemonApiConfig.endpoints.pokemon}/${pokemonName}`
    );
    return res.data;
  },
};
