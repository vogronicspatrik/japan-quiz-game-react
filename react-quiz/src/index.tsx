
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Context from './UserContext';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#fbcc34",
    },
    secondary: {
      main: "#695104",
    },
    background:{
      default:'#695104'
    }
  },
  typography:{
    fontFamily: '"shojumaru"',
  },
});

  const loadingMarkup = (
    <div className="py-4 text-center">
      <h3>Loading..</h3>
    </div>
  )

root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <BrowserRouter>
        <Context>
          <App />
        </Context>
      </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </Suspense>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();