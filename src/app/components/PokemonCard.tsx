import { useSearchParams } from 'react-router';
import { NavLink } from 'react-router';
import type { PokemonCardProps } from '@utils/types';

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, imgUrl, description } = pokemon;
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

  const button = (page: string): string =>
    `details/${name}?search=${search}&page=${page}`;

  return (
    <div className="col" data-testid="pokemon-card">
      <div className="card h-100">
        <div className="card-body">
          <img src={imgUrl} alt={name} className="card-img-top" />
          <h5 className="card-title text-capitalize">Pokemon: {name}</h5>
          <p className="card-text">Type: {description}</p>
          <NavLink to={button(page)} className="btn btn-primary">
            Pokemon Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
