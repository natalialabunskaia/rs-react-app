import { useNavigate } from 'react-router';
import type { PokemonCardProps } from '../utils/types';

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, imgUrl, description } = pokemon;
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`${name}`);
  };

  return (
    <div className="col" data-testid="pokemon-card">
      <div className="card h-100">
        <div className="card-body">
          <img src={imgUrl} alt={name} className="card-img-top" />
          <h5 className="card-title text-capitalize">Pokemon: {name}</h5>
          <p className="card-text">Type: {description}</p>
          <button onClick={handleDetailsClick} className="btn btn-primary">
            Pokemon Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
