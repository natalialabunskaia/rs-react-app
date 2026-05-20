import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router';
import './PokemonDetails.css';

import type { PokemonByNameResponse } from '@/app/api/pokemonApiTypes';

type OutletContext = {
  pokemons: PokemonByNameResponse[];
};

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pokemons } = useOutletContext<OutletContext>();

  const pokemon = pokemons.find((item) => item.name === id);
  const page = searchParams.get('page');
  const { name, imgUrl, description, details } = pokemon as PokemonByNameResponse;

  const handleClose = () => {
    navigate(`/?page=${page}`);
  };

  return (
    <aside className="pokemon-details">
      <section className="about-pokemon">
        <div className="pokemon-avatar">
          <img src={imgUrl} alt={name} />
        </div>

        <div>
          <h1>About {name}</h1>
          <p>This Pokémon is {details}</p>
          <p>Types: {description}</p>

          <button onClick={handleClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </section>
    </aside>
  );
};

export default PokemonDetails;
