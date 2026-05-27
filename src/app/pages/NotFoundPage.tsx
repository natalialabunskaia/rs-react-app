import { Link } from 'react-router';
import NotFoundIcon from '@assets/404.png';

const NotFoundPage = () => {
  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center px-3">
      <section
        className="bg-body rounded-4 p-4 border text-center w-100 mx-auto"
        style={{ maxWidth: '420px' }}
      >
        <div className="mb-3">
          <img
            src={NotFoundIcon}
            alt="Lost Pokémon"
            className="img-fluid"
            style={{ maxWidth: '160px' }}
          />

          <div>
            <h1 className="h3 mb-3">404 — Page not found</h1>
            <p>
              Oops! This route ran away into the tall grass. The page you are
              looking for does not exist.
            </p>

            <Link to="/" className="btn btn-primary mt-2">
              Back to App
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
