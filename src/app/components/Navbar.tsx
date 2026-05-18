import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark text-white">
      <div className="container-fluid bg-dark text-white px-5 d-flex align-items-center justify-content-start gap-4">
          <Link className="navbar-brand m-0" to="/">
            <img
              src="/pikachu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Pikachu"
            />
          </Link>
        <div className="navbar-nav flex-row gap-3">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
