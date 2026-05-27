import aboutPageIcon from '@assets/nintendo.png';

const pokeApiLink = 'https://pokeapi.co/';
const gitHubAuthorLink = 'https://github.com/natalialabunskaia';
const rsSchoolLink = 'https://rs.school/courses/reactjs';

const AboutPage = () => {
  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center px-3">
      <section
        className="bg-body rounded-4 p-4 border text-center w-100 mx-auto"
        style={{ maxWidth: '420px' }}
      >
        <div className="pokemon-avatar">
          <img
            src={aboutPageIcon}
            alt="Pokemon"
            style={{ maxWidth: '160px' }}
          />
        </div>

        <div>
          <h1>About this app</h1>
          <p>
            This Pokédex app uses the{' '}
            <a href={pokeApiLink} target="_blank" rel="noreferrer">
              PokéAPI
            </a>{' '}
            to help trainers explore Pokémon, search through the collection and
            open detailed Pokémon cards.
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
            className="btn btn-primary"
          >
            Visit RS School React Course →
          </a>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
