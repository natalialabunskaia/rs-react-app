import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from '@routes/root';
import { HomePage } from '@/app/pages/homePage/HomePage';
import NotFoundPage from '@/app/pages/notFoundPage/NotFoundPage';
import AboutPage from '@/app/pages/aboutPage/AboutPage';
import PokemonDetails from '@/app/components/pokemonDetails/PokemonDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
        children: [
          {
            path: 'details/:id',
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
