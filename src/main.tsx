import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from '@routes/root';
import { HomePage } from '@/app/pages/HomePage';
import NotFoundPage from '@/app/pages/NotFoundPage';
import AboutPage from '@/app/pages/AboutPage';
import PokemonDetails from '@/app/components/PokemonDetails';
import { ThemeProvider } from './context/themeProvider';

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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
