import React from "react";
import "./App.css";
import InternCoinBalance from "./Components/InternCoinBalance";
import TotalSupply from "./Components/TotalSupply";
import SendInternCoin from "./Components/SendInternCoin"; // Import the new component
import { WalletContextProvider } from "./Context/WalletProvider";

function App() {
  return (
    <WalletContextProvider>
      <div className="container">
        <h1>InternCoin Dashboard</h1>

        <div className="section">
          <InternCoinBalance />
        </div>

        <div className="section">
          <TotalSupply />
        </div>

        <div className="section">
          <SendInternCoin />
        </div>

        <footer>
          Powered by InternCoin © {new Date().getFullYear()}
        </footer>
      </div>
    </WalletContextProvider>
  );
}

export default App;
