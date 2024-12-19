import React, { useContext, useState, useEffect, useCallback } from 'react';
import useContract from '../utils/useContract';
import { WalletContext } from '../Context/WalletProvider';

const InternCoinBalance = () => {
  const { account } = useContext(WalletContext);
  const { getSignerContract } = useContract();
  const [balance, setBalance] = useState(0);

  const fetchBalance = useCallback(async () => {
    try {
      const contract = await getSignerContract(); // Get signer-based contract for the connected wallet
      console.log("Fetching balance for wallet:", account); // Debug log
      const rawBalance = await contract.balanceOf(account); // Call balanceOf
      console.log("Raw Balance (Smallest Unit):", rawBalance.toString()); // Debug log
      const formattedBalance = parseFloat(rawBalance.toString()) / 10 ** 18; // Convert to readable format
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, [account, getSignerContract]);
  

  useEffect(() => {
    if (account) fetchBalance();
  }, [account, fetchBalance]);

  return (
    <div>
      <h3>Your InternCoin Balance</h3>
      {account ? <p>{balance} InternCoin</p> : <p>Connect your wallet to see your balance.</p>}
    </div>
  );
};

export default InternCoinBalance;
