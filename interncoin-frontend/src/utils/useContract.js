import { JsonRpcProvider, Contract, ethers } from 'ethers';
import { contractAddress, contractABI } from '../utils/contract';

const useContract = () => {
  const getReadOnlyContract = () => {
    // Use a direct Sepolia RPC provider for read-only operations
    const provider = new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/iIyBy2pe3NUMmj-u9zDD3TJyzSu9xESY');
    console.log("Contract Address:", contractAddress);
    return new Contract(contractAddress, contractABI, provider);
  };

  const getSignerContract = async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  };

  return { getReadOnlyContract, getSignerContract };
};

export default useContract;
