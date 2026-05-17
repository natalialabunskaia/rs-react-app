import './AboutPage.css';

const AboutPage = () => {
  return (
    <main className="about-page">
      <section className="about-card">

        <div className="about-content">
          <div className="pokemon-avatar">
            <img src="/nintendo.png" alt="Pokéball" />
          </div>

          <div>
            <h1>About this app</h1>
            <p>
              This Pokédex app uses the{' '}
              <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
                PokéAPI
              </a>{' '}
              to help trainers explore Pokémon, search through the collection
              and open detailed Pokémon cards.
            </p>

            <p>
              Created by{' '}
              <a
                href="https://github.com/natalialabunskaia"
                target="_blank"
                rel="noreferrer"
              >
                Natalia Illarionova
              </a>
              , a React trainer learning routing, hooks, and clean component
              architecture.
            </p>

            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="rs-link"
            >
              Visit RS School React Course →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
