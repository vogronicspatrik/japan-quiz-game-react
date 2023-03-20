
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// import HttpApi from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

i18next
  // .use(HttpApi)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'hu'],
    fallbackLng: 'hu',
    debug: false,
    // // Options for language detector
    // detection: {
    //   order: ['path', 'cookie', 'htmlTag'],
    //   caches: ['cookie'],
    // },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })


  const loadingMarkup = (
    <div className="py-4 text-center">
      <h3>Loading..</h3>
    </div>
  )



root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();