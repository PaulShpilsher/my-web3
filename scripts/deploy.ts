import { ethers } from "hardhat";

// npx hardhat node
// npx hardhat run scripts/deploy.ts --network localhost

async function main() {
  const baseTokenURI = 'ipfs://QmP9FqjMHAbyvVnojrhNaMhwGZCGg3H5MwjLTsJHwQnFRn/';
  const contractFactory = await ethers.getContractFactory("NFTCollectible"); 
  const contract = await contractFactory.deploy(baseTokenURI);
  // Wait for this transaction to be mined
  await contract.deployed();
  
  console.log("NFTCollectible deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
