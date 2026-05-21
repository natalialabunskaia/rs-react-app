export type AllPokemonRespoonse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
};

export type PokemonItem = {
  url: string;
  name: string;
};

export type PokemonTypeResponse = {
  pokemon: PokemonTypeItem[];
};

export type PokemonTypeItem = {
  pokemon: PokemonItem;
};

export type PokemonByNameResponse = {
  name: string;
  imgUrl: string;
  description: string;
  weight?: number;
  height?: number;
  sprites?: {
    front_default: string;
  };
  types?: PokemonTypeSlot[];
  details?: string;
};

export type PokemonTypeSlot = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
