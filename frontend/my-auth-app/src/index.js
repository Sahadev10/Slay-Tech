// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// src/index.js
import './App.css'; // Comment this line if needed

const container = document.getElementById('root');
const root = createRoot(container); // Create a root for rendering

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
