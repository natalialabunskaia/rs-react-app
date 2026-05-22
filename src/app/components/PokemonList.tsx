import PokemonCard from '@components/PokemonCard';
import type { PokemonByNameResponse } from '@api/pokemonApiTypes';

const PokemonList = ({ pokemons }: { pokemons: PokemonByNameResponse[] }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
