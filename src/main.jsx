import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Make sure App is imported correctly
import "./index.css";
import LoginReg from "./LoginReg/LoginReg.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
