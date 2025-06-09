// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import T46Page from './pages/T46Page.jsx';
import T48Page from './pages/T48Page.jsx';
import T53Page from './pages/T53Page.jsx'; // Importă pagina nouă

// Creăm router-ul care definește toate paginile (rutele)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 't46',
        element: <T46Page />,
      },
      {
        path: 't48',
        element: <T48Page />,
      },
      {
        path: 't53',
        element: <T53Page />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);