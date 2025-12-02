
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/store.js';
import AuthProvider from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={"/"}>
        <AuthProvider>
          <Provider store={store}>
            <ScrollToTop />
            <App />
          </Provider>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </HelmetProvider>
  </React.StrictMode>
);
