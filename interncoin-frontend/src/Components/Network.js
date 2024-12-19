import React, { useContext } from 'react';
import { WalletContext } from '../Context/WalletProvider';

const NetworkInfo = () => {
  const { network } = useContext(WalletContext);

  return (
    <div>
      <h3>Connected Network</h3>
      <p>{network ? `You are connected to: ${network}` : 'Not connected'}</p>
    </div>
  );
};

export default NetworkInfo;
