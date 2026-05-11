import axios from 'axios';
import { it, describe, expect, afterEach, vi } from 'vitest';
import { pokemonApiClient } from '../../app/api/pokemonApiClient';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

const mockAllPokemonsData = {
  count: 1350,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const mockPokemonTypeData = {
  id: 12,
  name: 'grass',
  damage_relations: {
    double_damage_from: [
      {
        name: 'flying',
        url: 'https://pokeapi.co/api/v2/type/3/',
      },
      {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    ],
    double_damage_to: [
      {
        name: 'ground',
        url: 'https://pokeapi.co/api/v2/type/5/',
      },
      {
        name: 'water',
        url: 'https://pokeapi.co/api/v2/type/11/',
      },
    ],
    half_damage_from: [],
    half_damage_to: [],
    no_damage_from: [],
    no_damage_to: [],
  },
  pokemon: [
    {
      pokemon: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
      slot: 1,
    },
  ],
};

const mockPokemonDetailsData = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  base_experience: 64,
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  forms: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-form/1/',
    },
  ],
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('pokemonApiClient.getAllPokemons', () => {
  it('calls axios.get with the pokemon list endpoint including default limit and offset', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockAllPokemonsData });
    await pokemonApiClient.getAllPokemons();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
  });

  it('returns response data when the pokemon list request is successful', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockAllPokemonsData });
    const result = await pokemonApiClient.getAllPokemons();
    expect(result).toEqual(mockAllPokemonsData);
  });

  it('rejects with an error when the pokemon list request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.get.mockRejectedValue(error);
    await expect(pokemonApiClient.getAllPokemons()).rejects.toThrow(
      'failed request'
    );
  });
});

describe('pokemonApiClient.getPokemonByType', () => {
  it('calls axios.get with the type endpoint and provided pokemon type', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonTypeData });
    await pokemonApiClient.getPokemonByType('grass');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/type/grass'
    );
  });

  it('returns response data when the pokemon type request is successful', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonTypeData });
    const result = await pokemonApiClient.getPokemonByType('grass');
    expect(result).toEqual(mockPokemonTypeData);
  });

  it('rejects with an error when the pokemon type request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.get.mockRejectedValue(error);
    await expect(pokemonApiClient.getPokemonByType('grass')).rejects.toThrow(
      'failed request'
    );
  });
});

describe('pokemonApiClient.getPokemonByName', () => {
  it('calls axios.get with the pokemon endpoint and provided pokemon name', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonDetailsData });
    await pokemonApiClient.getPokemonByName('bulbasaur');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
  });
  it('returns response data when the pokemon details request is successful', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonDetailsData });
    const result = await pokemonApiClient.getPokemonByName('bulbasaur');
    expect(result).toEqual(mockPokemonDetailsData);
  });
  it('rejects with an error when the pokemon details request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.get.mockRejectedValue(error);
    await expect(
      pokemonApiClient.getPokemonByName('bulbasaur')
    ).rejects.toThrow('failed request');
  });
});
