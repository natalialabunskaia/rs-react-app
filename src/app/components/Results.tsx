import React from 'react';

type PokemonResult = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

type SearchProps = {
  pokemons: PokemonResult[];
  searchTerm: string
};

export default class Results extends React.Component<SearchProps> {
  render() {
    const { pokemons, searchTerm } = this.props;
    return (
      <section className="container-fluid container-xxl p-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {pokemons.map((item) => {
            return (
              <div className="col" key={item.pokemon.name}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{item.pokemon.name}</h5>
                    <p className="card-text">Type:{` ${searchTerm}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
