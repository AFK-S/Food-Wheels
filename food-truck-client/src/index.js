import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import StateProvider from "./context/StateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <StateProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StateProvider>

);
