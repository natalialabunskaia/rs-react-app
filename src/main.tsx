import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from '@routes/root';
import { HomePage } from '@pages/HomePage/HomePage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import AboutPage from '@pages/AboutPage/AboutPage';
import PokemonDetails from '@/app/components/PokemonDetails';

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
