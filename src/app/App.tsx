import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
