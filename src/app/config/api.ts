export const pokemonApiConfig = {
  baseUrl: import.meta.env.VITE_POKEMON_API_BASE_URL,
  endpoints: {
    pokemon: 'pokemon',
    type: 'type',
  },
  defaultLimit: 20,
  defaultOffset: 0,
};
