import React, { useState, useEffect, useCallback } from 'react';
import useContract from '../utils/useContract';

const TotalSupply = () => {
  const { getReadOnlyContract } = useContract();
  const [totalSupply, setTotalSupply] = useState(0);

  const fetchTotalSupply = useCallback(async () => {
    try {
      const contract = getReadOnlyContract();
      //console.log("Contract Instance:", contract); // Debug log
      //console.log("Fetching total supply..."); // Debug log
      const rawSupply = await contract.totalSupply();
      //console.log("Raw Total Supply (Smallest Unit):", rawSupply.toString()); // Debug log
      const formattedSupply = parseFloat(rawSupply.toString()) / 10 ** 18;
      //console.log("Formatted Total Supply:", formattedSupply); // Debug log
      setTotalSupply(formattedSupply);
    } catch (error) {
      console.error("Error fetching total supply:", error);
    }
  }, [getReadOnlyContract]);
  

  useEffect(() => {
    fetchTotalSupply();
  }, [fetchTotalSupply]);

  return (
    <div>
      <h3>Total InternCoin Supply</h3>
      <p>{totalSupply} InternCoin</p>
    </div>
  );
};

export default TotalSupply;
