import React, { useContext } from 'react';
import { WalletContext } from '../Context/WalletProvider';

const ConnectWallet = () => {
  const { account, connectWallet } = useContext(WalletContext);

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectWallet;
