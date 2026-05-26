import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router';
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
  const search = searchParams.get('search');
  const { name, imgUrl, description, details } =
    pokemon as PokemonByNameResponse;

  const handleClose = () => {
    navigate(`/?search=${search}&page=${page}`);
  };

  return (
    <aside className="p-4 position-sticky top-0 z-2">
      <section className="bg-white rounded-4 p-3 border text-center w-100 mx-auto">
        <div className="pokemon-avatar">
          <img src={imgUrl} alt={name} />
        </div>

        <div>
          <h1 className="text-capitalize">About {name}</h1>
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
