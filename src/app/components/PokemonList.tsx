import PokemonCard from './PokemonCard';
import type { PokemonDetails } from '../utils/types';

const PokemonList = ({ pokemons }: { pokemons: PokemonDetails[] }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-4">
      {pokemons.map((pokemon: PokemonDetails) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
