import type { PokemonCardProps } from '../utils/types';

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, imgUrl, description } = pokemon;

  return (
    <div className="col" data-testid="pokemon-card">
      <div className="card h-100">
        <div className="card-body">
          <img src={imgUrl} alt={name} className="card-img-top" />
          <h5 className="card-title text-capitalize">Name: {name}</h5>
          <p className="card-text">Description: {description}</p>
          <a href="#" className="btn btn-primary">
            Pokemon Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
