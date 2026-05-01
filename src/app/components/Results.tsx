import React from 'react';

type PokemonResult = {
  name: string;
  imgUrl: string;
  description: string;
};

type SearchProps = {
  pokemons: PokemonResult[];
  searchTerm: string;
};

export default class Results extends React.Component<SearchProps> {
  render() {
    const { pokemons } = this.props;
    return (
      <section className="container-fluid container-xxl p-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {pokemons.map((item) => {
            return (
              <div className="col" key={item.name}>
                <div className="card h-100">
                  <div className="card-body">
                    <img src={item.imgUrl} className="card-img-top"></img>
                    <h5 className="card-title text-capitalize">
                      Name: {item.name}
                    </h5>
                    <p className="card-text">Description: {item.description}</p>
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
