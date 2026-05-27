import { Link } from 'react-router';
import NavbarIcon from '@assets/pikachu.png';
import { useTheme, useThemeUpdate } from '@/context/themeContext';

const navLinks = [
  {
    to: '/',
    label: 'Home',
  },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <nav className="navbar navbar-dark bg-dark text-white">
      <div className="container-fluid bg-dark text-white px-5 d-flex align-items-center justify-content-start gap-4">
        <Link className="navbar-brand m-0" to="/">
          <img
            src={NavbarIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Pikachu"
          />
        </Link>
        <div className="navbar-nav flex-row gap-3">
          {navLinks.map((link) => (
            <Link key={link.label} className="nav-link" to={link.to}>
              {link.label}
            </Link>
          ))}
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleTheme}
          >
            {darkTheme ? '☀️ light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
