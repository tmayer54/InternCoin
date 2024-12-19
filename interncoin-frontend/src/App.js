import React from 'react';
import ConnectWallet from './Components/ConnectWallet';
import InternCoinBalance from './Components/InternCoinBalance';
import TotalSupply from './Components/TotalSupply';
import Network from './Components/Network';

const App = () => {
  return (
    <div>
      <h1>InternCoin Dashboard</h1>
      <ConnectWallet />
      <InternCoinBalance />
      <TotalSupply />
      <Network />
    </div>
  );
};

export default App;
