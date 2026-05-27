import { useSearchParams } from 'react-router';
import { NavLink } from 'react-router';
import { usePokemonStore } from '@/app/stores/PokemonStore';
import type { PokemonCardProps } from '@utils/types';

const PokemonCard = ({
  pokemon,
  handleChoose,
  isChecked,
}: PokemonCardProps) => {
  const { name, imgUrl, description } = pokemon;
  const [searchParams] = useSearchParams();
  const { pokemons } = usePokemonStore();

  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

  const path = (page: string): string =>
    `details/${name}?search=${search}&page=${page}`;

  return (
    <div className="col" data-testid="pokemon-card">
      <div className="card h-100">
        <div className="card-body">
          <div>
            <input
              onChange={(e) => handleChoose(e, pokemon)}
              checked={isChecked(pokemons, pokemon)}
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
