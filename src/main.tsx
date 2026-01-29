import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";

// Set axios base URL to backend server port 5002
axios.defaults.baseURL = "/api";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
