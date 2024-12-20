import React, { useContext, useEffect, useCallback } from "react";
import { WalletContext } from "../Context/WalletProvider";
import useContract from "../utils/useContract";
const { ethers } = require("ethers");

const InternCoinBalance = () => {
  const { account, connectWallet, balance, setBalance } = useContext(WalletContext);
  const { getReadOnlyContract } = useContract();

  const fetchBalance = useCallback(async () => {
    try {
      const contract = getReadOnlyContract(); // Use read-only contract
      console.log("Contract Instance:", contract);

      const rawBalance = await contract.balanceOf(account);
      const formattedBalance = ethers.formatUnits(rawBalance, 18); // Assuming 18 decimals
      console.log("InternCoin Balance:", formattedBalance);

      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching InternCoin balance:", error);
    }
  }, [account, getReadOnlyContract, setBalance]);

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