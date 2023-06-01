import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "./context/contactsContextA";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("index");
root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// console.clear();
// to clear all consoles warnings error anything
// console.log = console.warn = console.error = () => {};
console.log = console.warn = () => {};
