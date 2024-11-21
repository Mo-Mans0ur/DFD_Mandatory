import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './css/global.css'; // Import the global CSS here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
