import { useSearchParams } from 'react-router';
import { NavLink } from 'react-router';
import { usePokemonStore } from '@stores/PokemonStore';
import type { PokemonCardProps } from '@utils/types';

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, imgUrl, description } = pokemon;
  const [searchParams] = useSearchParams();
  const { addPokemon, removePokemon, pokemons } = usePokemonStore();

  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

  const isChecked = pokemons.some(
    (pokemonFromStore) => pokemonFromStore.name === pokemon.name
  );

  const path = (page: string): string =>
    `details/${name}?search=${search}&page=${page}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addPokemon(pokemon);
    } else {
      removePokemon(pokemon.name);
    }
  };

  return (
    <div className="col" data-testid="pokemon-card">
      <div className="card h-100">
        <div className="card-body">
          <div>
            <input
              onChange={handleChange}
              checked={isChecked}
              className="form-check-input me-1"
              type="checkbox"
              id="chosen-pokemon"
            />
            <label className="form-check-label" htmlFor="chosen-pokemon">
              Catch this Pokemon
            </label>
          </div>
          <img src={imgUrl} alt={name} className="card-img-top" />
          <h5 className="card-title text-capitalize">Pokemon: {name}</h5>
          <p className="card-text">Type: {description}</p>
          <NavLink to={path(page)} className="btn btn-primary">
            Pokemon Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
