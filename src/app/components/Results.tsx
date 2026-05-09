import React from 'react';
import type { ResultProps } from '../utils/types';

export default class Results extends React.Component<ResultProps> {
  render() {
    const { pokemons } = this.props;
    return (
      <section className="container-fluid container-xxl p-5" data-testid="results-container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {pokemons.map((item) => {
            return (
              <div className="col" key={item.name} data-testid="pokemon-card">
                <div className="card h-100">
                  <div className="card-body">
                    <img src={item.imgUrl} alt={item.name} className="card-img-top"></img>
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
