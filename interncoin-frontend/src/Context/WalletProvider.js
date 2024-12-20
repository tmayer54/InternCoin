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

  const sendInternCoin = async (recipient, amount) => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }
  
      if (!ethers.isAddress(recipient)) {
        throw new Error("Invalid recipient address");
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Convert amount to the smallest unit (wei) based on 18 decimals
      const amountInWei = ethers.parseUnits(amount.toString(), 18);
  
      const transaction = await contract.transfer(recipient, amountInWei);
      console.log("Transaction sent:", transaction);
  
      // Wait for the transaction to be mined
      const receipt = await transaction.wait();
      console.log("Transaction confirmed:", receipt);
  
      alert(`Successfully sent ${amount} InternCoin to ${recipient}`);
    } catch (error) {
      console.error("Error sending InternCoin:", error);
      alert(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <WalletContext.Provider value={{ account, balance, setBalance, connectWallet, logout, sendInternCoin }}>
      {children}
    </WalletContext.Provider>
  );
};
