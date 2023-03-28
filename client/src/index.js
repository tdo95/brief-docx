import React from 'react';
import ReactDOM from 'react-dom/client';
//BrowserRouter connects the URL in our broswer to our react application.
// I am using HistoryRouter instead to allow support for the use of custom hooks that need to use the navigator.block function. This throws an error with BrowserRouter in react v6.6. The history package which supports access to navigation.block is used to create browser history instead.
//https://github.com/remix-run/react-router/issues/8139#issuecomment-1247080906
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory  } from 'history';
import { AuthProvider } from './context/auth';
import { DocumentProvider } from './context/document';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryRouter history={createBrowserHistory({ window })}>
      <AuthProvider>
        <DocumentProvider>
          <App />
        </DocumentProvider>
      </AuthProvider>
    </HistoryRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
