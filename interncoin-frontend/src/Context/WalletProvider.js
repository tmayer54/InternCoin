import React, { createContext, useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const browserProvider = new BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();
        const currentNetwork = await browserProvider.getNetwork();

        console.log("Connected Wallet Address:", address); // Debug log
        console.log("Connected Network:", currentNetwork); // Debug log

        if (currentNetwork.chainId !== 11155111) { // Sepolia chain ID
          alert("Please switch to the Sepolia network.");
        }

        setProvider(browserProvider);
        setAccount(address);
        setNetwork(currentNetwork.name);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const browserProvider = new BrowserProvider(window.ethereum);
          setProvider(browserProvider);
          setAccount(accounts[0]);
        }
      }
    };

    const setupListeners = () => {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload(); // Reload on network change
        });
      }
    };

    checkConnection();
    setupListeners();
  }, []);

  return (
    <WalletContext.Provider value={{ account, provider, network, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
