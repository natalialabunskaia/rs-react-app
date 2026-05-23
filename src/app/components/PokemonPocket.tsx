import { usePokemonStore } from '@/app/store/PokemonStore';

const PokemonPocket = () => {
  const { removePokemon, removeAllPokemons, count, pokemons } =
    usePokemonStore();

  const handleRemovePokemon = (name: string) => {
    removePokemon(name);
  };

  const handleRemoveAllPokemons = () => {
    removeAllPokemons();
  };

  return (
    <aside className="p-4 position-sticky bottom-0 mt-auto mb-4 z-3">
      <section className="bg-white rounded-4 p-4 border text-center w-100 mx-auto">
        <div>
          <h1 className="mb-3">Pokemon Pocket</h1>
          <p className="mb-3">You catch: {count} pokemon(s)!</p>
          {pokemons.length > 0 ? (
            <button
              onClick={handleRemoveAllPokemons}
              type="button"
              className="btn btn-danger mb-3"
            >
              Remove all Pokemons
            </button>
          ) : null}
          <ul className="list-group">
            {pokemons.map((pokemon) => {
              return (
                <li
                  key={pokemon.name}
                  className="list-group-item d-flex justify-content-between align-items-center gap-3"
                >
                  <span className="text-capitalize">{pokemon.name}</span>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      onClick={() => handleRemovePokemon(pokemon.name)}
                      type="button"
                      className="btn btn-primary btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </aside>
  );
};

export default PokemonPocket;
