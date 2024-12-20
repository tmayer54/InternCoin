import React, { useContext, useState } from "react";
import { WalletContext } from "../Context/WalletProvider";

const SendInternCoin = () => {
  const { sendInternCoin, account } = useContext(WalletContext);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!recipient || !amount) {
      alert("Please enter both recipient address and amount.");
      return;
    }

    await sendInternCoin(recipient, amount);

    // Clear form inputs
    setRecipient("");
    setAmount("");
  };

  return (
    <div>
      <h3>Send InternCoin</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient Address:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient address"
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendInternCoin;
