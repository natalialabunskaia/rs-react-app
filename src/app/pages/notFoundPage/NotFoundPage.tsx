import { Link } from 'react-router';
import NotFoundIcon from '@assets/404.png';
import style from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main className={style.notFoundPage}>
      <section className={style.notFoundCard}>
        <div className={style.notFoundContent}>
          <div className={style.notFoundAvatar}>
            <img src={NotFoundIcon} alt="Lost Pokémon" />
          </div>

          <div>
            <h1>404 — Page not found</h1>
            <p>
              Oops! This route ran away into the tall grass. The page you are
              looking for does not exist.
            </p>

            <Link to="/" className={style.homeLink}>
              Back to App
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
