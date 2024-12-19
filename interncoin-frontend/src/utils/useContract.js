import { JsonRpcProvider, BrowserProvider, Contract } from 'ethers';
import { contractAddress, contractABI } from '../utils/contract';

const useContract = () => {
  const getReadOnlyContract = () => {
    // Use a direct Sepolia RPC provider for read-only operations
    const provider = new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/iIyBy2pe3NUMmj-u9zDD3TJyzSu9xESY');
    console.log("Contract Address:", contractAddress);
    return new Contract(contractAddress, contractABI, provider);
  };

  const getSignerContract = async () => {
    if (window.ethereum) {
      const browserProvider = new BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();
      return new Contract(contractAddress, contractABI, signer);
    } else {
      alert('MetaMask is not installed!');
      return null;
    }
  };

  return { getReadOnlyContract, getSignerContract };
};

export default useContract;
