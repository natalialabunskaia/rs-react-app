import axios from 'axios';
import { pokemonApiConfig } from '../config/api';

export const pokemonApiClient = {
  getAllPokemons: async (offset: number = pokemonApiConfig.defaultOffset) => {
    const res = await axios.get(
      `${pokemonApiConfig.baseUrl}${pokemonApiConfig.endpoints.pokemon}?limit=${pokemonApiConfig.defaultLimit}&offset=${offset}`
    );
    return res.data;
  },

  getPokemonByType: async (type: string) => {
    const res = await axios.get(
      `${pokemonApiConfig.baseUrl}${pokemonApiConfig.endpoints.type}/${type}`
    );
    return res.data;
  },

  getPokemonByName: async (pokemonName: string) => {
    const res = await axios.get(
      `${pokemonApiConfig.baseUrl}${pokemonApiConfig.endpoints.pokemon}/${pokemonName}`
    );
    return res.data;
  },
};
