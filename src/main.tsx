import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './routes/root';
import { HomePage } from './app/pages/HomePage/HomePage';
import NotFoundPage from './app/pages/NotFoundPage/NotFoundPage';
import AboutPage from './app/pages/AboutPage/AboutPage';
import PokemonDetails from './app/components/PokemonDetails/PokemonDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: ':id',
            element: <PokemonDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
