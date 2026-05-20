import './AboutPage.css';
import AboutPageIcon from '@asserts/nintendo.png';

const pokeApiLink = 'https://pokeapi.co/';
const gitHubAuthorLink = 'https://github.com/natalialabunskaia';
const rsSchoolLink = 'https://rs.school/courses/reactjs';

const AboutPage = () => {
  return (
    <main className="about-page">
      <section className="about-card">
        <div className="about-content">
          <div className="pokemon-avatar">
            <img src={AboutPageIcon} alt="Pokemon" />
          </div>

          <div>
            <h1>About this app</h1>
            <p>
              This Pokédex app uses the{' '}
              <a href={pokeApiLink} target="_blank" rel="noreferrer">
                PokéAPI
              </a>{' '}
              to help trainers explore Pokémon, search through the collection
              and open detailed Pokémon cards.
            </p>

            <p>
              Created by{' '}
              <a href={gitHubAuthorLink} target="_blank" rel="noreferrer">
                Natalia Illarionova
              </a>
              , a React trainer learning routing, hooks, and clean component
              architecture.
            </p>

            <a
              href={rsSchoolLink}
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
