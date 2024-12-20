import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot instead of render
import { WalletContextProvider } from "./Context/WalletProvider";
import App from "./App";
import "./index.css";

// Get the root element from the DOM
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Render the App component wrapped in WalletContextProvider
root.render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>
);
