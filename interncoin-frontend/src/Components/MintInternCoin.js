import React, { useState } from 'react';
import useContract from '../utils/useContract';

const MintInternCoin = () => {
  const { getContract } = useContract();
  const [amount, setAmount] = useState("");

  const mintToken = async () => {
    const contract = await getContract();
    if (contract) {
      try {
        const tx = await contract.mint(amount); // Replace with your contract method
        await tx.wait();
        alert(`Successfully minted ${amount} InternCoin!`);
      } catch (error) {
        console.error(error);
        alert("Transaction failed!");
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={mintToken}>Mint InternCoin</button>
    </div>
  );
};

export default MintInternCoin;
