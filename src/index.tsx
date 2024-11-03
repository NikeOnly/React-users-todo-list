import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ModuleRegistry } from '@ag-grid-community/core';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// AgGrid
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
