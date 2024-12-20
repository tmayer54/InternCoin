import React from "react";
import "./App.css";
import InternCoinBalance from "./Components/InternCoinBalance";
import TotalSupply from "./Components/TotalSupply";
import { WalletContextProvider } from './Context/WalletProvider';


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

        <footer>
          <p>InternCoin &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </WalletContextProvider>
  );
}

export default App;
