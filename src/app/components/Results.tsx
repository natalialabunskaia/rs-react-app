import PokemonCard from './PokemonCard';
import type { ResultProps, PokemonDetails} from '../utils/types';

const Results = ({ pokemons }: ResultProps) => {
  return (
    <section
      className="container-fluid container-xxl p-5"
      data-testid="results-container"
    >
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {pokemons.map((pokemon: PokemonDetails) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
};

export default Results;