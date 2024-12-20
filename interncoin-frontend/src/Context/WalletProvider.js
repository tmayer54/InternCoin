import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../utils/contract';


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

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(selectedAccount);

      // Fetch InternCoin balance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const rawBalance = await contract.balanceOf(selectedAccount);
      const formattedBalance = ethers.formatUnits(rawBalance, 18);
      setBalance(formattedBalance);
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
        }
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet, balance, setBalance }}>
      {children}
    </WalletContext.Provider>
  );
};
