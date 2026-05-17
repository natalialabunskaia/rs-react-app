import { Link } from 'react-router';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <div className="not-found-content">
          <div className="not-found-avatar">
            <img src="/404.png" alt="Lost Pokémon" />
          </div>

          <div>
            <h1>404 — Page not found</h1>
            <p>
              Oops! This route ran away into the tall grass. The page you are
              looking for does not exist.
            </p>

            <Link to="/" className="home-link">
              Back to App
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;