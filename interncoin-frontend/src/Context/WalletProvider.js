import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed!');
        return;
      }
      const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(selectedAccount);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const balanceRaw = await signer.getBalance();
      const balanceFormatted = ethers.formatUnits(balanceRaw, 18); // Convert to ETH format
      setBalance(balanceFormatted);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          connectWallet(); // Fetch wallet data
        }
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet, balance }}>
      {children}
    </WalletContext.Provider>
  );
};
