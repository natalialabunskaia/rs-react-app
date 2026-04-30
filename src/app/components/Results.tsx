import React from 'react';

export default class Results extends React.Component {
  render() {
    return (
      <section className="container-fluid container-xxl p-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-capitalize">pikachu</h5>
                <p className="card-text">Type: electric</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-capitalize">raichu</h5>
                <p className="card-text">Type: electric</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-capitalize">magnemite</h5>
                <p className="card-text">Type: electric</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
