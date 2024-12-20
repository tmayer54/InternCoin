import React, { useContext, useEffect, useCallback } from 'react';
import { WalletContext } from '../Context/WalletProvider';
import useContract from '../utils/useContract';

const InternCoinBalance = () => {
  const { account, connectWallet, balance } = useContext(WalletContext);
  const { getSignerContract } = useContract();

  const fetchBalance = useCallback(async () => {
    try {
      const contract = await getSignerContract();
      const rawBalance = await contract.balanceOf(account);
      const formattedBalance = parseFloat(rawBalance.toString()) / 10 ** 18;
      console.log('Balance:', formattedBalance); // Debug
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, [account]);

  useEffect(() => {
    if (account) fetchBalance();
  }, [account, fetchBalance]);

  return (
    <div>
      {account ? (
        <div className="connected-badge">
          Connected: {account}
        </div>
      ) : (
        <div className="not-connected-badge">
          Wallet Not Connected
        </div>
      )}

      {!account && (
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      )}

      <h3>Your InternCoin Balance</h3>
      <p>{balance} InternCoin</p>
    </div>
  );
};

export default InternCoinBalance;
