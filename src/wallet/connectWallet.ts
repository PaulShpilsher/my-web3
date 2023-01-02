import { contractAddress } from "./contractAddress";

import { BigNumber, ethers } from "ethers";
import { NFTCollectible__factory } from '../typechain-types/factories/contracts/NFTCollectible__factory'

const connectWallet = async () => {
    try {
      console.log("connect wallet");
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const contract = NFTCollectible__factory.connect
                       (contractAddress, provider.getSigner());
      //const contract = new ethers.Contract
      //(contractAddress, NFTCollectible__factory.abi, signer) as NFTCollectible;
      const ownerAddress = await contract.owner();
      const symbol = await contract.symbol();
      const baseTokenURI = await contract.baseTokenURI();
      const balance = await (await contract.balanceOf(accounts[0])).toNumber();
      const ethBalance = ethers.utils.formatEther
                         (await provider.getBalance(accounts[0]));
      const isOwner = (ownerAddress.toLowerCase() === accounts[0].toLowerCase());
      const price = ethers.utils.formatEther(await contract.PRICE());
      setState({
        iconColor: "success",
        connectedWallet: accounts[0],
        contractSymbol: symbol,
        contractAddress: contract.address,
        contractBaseTokenURI: baseTokenURI,
        contractOwnerAddress: ownerAddress,
        contractPrice: `${price} ETH`,
        isOwner: isOwner
      });

      console.log("Connected", accounts[0]);
    } catch (error) {
      console.log(error);
    }
};