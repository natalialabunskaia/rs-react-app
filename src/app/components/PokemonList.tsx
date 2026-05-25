import PokemonCard from '@components/PokemonCard';
import type { PokemonListProps } from '../utils/types';

const PokemonList = ({
  pokemons,
  handleChoose,
  isChecked,
}: PokemonListProps) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-4">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          handleChoose={handleChoose}
          isChecked={isChecked}
        />
      ))}
    </div>
  );
};

export default PokemonList;
