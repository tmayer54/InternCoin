import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/contract";

export const WalletContext = createContext();

export const WalletContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const [selectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(selectedAccount);

      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const rawBalance = await contract.balanceOf(selectedAccount);
      const formattedBalance = ethers.formatUnits(rawBalance, 18);
      setBalance(formattedBalance); // Properly sets balance
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const logout = async () => {
    setAccount(null);
    setBalance(0);

    if (window.ethereum) {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    }
  };

  return (
    <WalletContext.Provider value={{ account, balance, setBalance, connectWallet, logout }}>
      {children}
    </WalletContext.Provider>
  );
};
