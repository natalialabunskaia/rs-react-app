import PokemonList from './PokemonList';
import type { ResultProps } from '../utils/types';
import { Pagination } from './Pagination';

const Results = ({ pokemons, status }: ResultProps) => {
  return (
    <section
      className="container-fluid container-xxl p-5"
      data-testid="results-container"
    >
      <Pagination status={status} />
       <PokemonList pokemons={pokemons} />
      <Pagination status={status} />
    </section>
  );
};

export default Results;
