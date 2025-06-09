// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import TD04Page from './pages/TD04Page.jsx'; // Importă pagina nouă
import TD20Page from './pages/TD20Page.jsx'; // Importă pagina nouă
import T46Page from './pages/T46Page.jsx';
import T47Page from './pages/T47Page.jsx';
import T48Page from './pages/T48Page.jsx';
import T53Page from './pages/T53Page.jsx';
import T55Page from './pages/T55Page.jsx'; // Importă pagina nouă
import T59Page from './pages/T59Page.jsx';
import TFig01Page from './pages/TFig01Page.jsx'; // Importă pagina nouă
import TFig06Page from './pages/TFig06Page.jsx'; // Importă pagina nouă
import TFig08Page from './pages/TFig08Page.jsx';

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
        path: 'td04',
        element: <TD04Page />,
      },
      {
        path: 'td20',
        element: <TD20Page />,
      },
      {
        path: 't46',
        element: <T46Page />,
      },
      {
        path: 't47',
        element: <T47Page />,
      },
      {
        path: 't48',
        element: <T48Page />,
      },
      {
        path: 't53',
        element: <T53Page />,
      },
      {
        path: 't55',
        element: <T55Page />,
      },
      {
        path: 't59',
        element: <T59Page />,
      },
      {
        path: 'tfig01',
        element: <TFig01Page />,
      },
      {
        path: 'tfig06',
        element: <TFig06Page />,
      },
      {
        path: 'tfig08',
        element: <TFig08Page />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);