import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTCollectible } from "../src/typechain-types/contracts/NFTCollectible";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("NFTCollectible", () => {
  let contract: NFTCollectible;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("NFTCollectible");
    contract = await contractFactory.deploy("baseTokenURI");
    await contract.deployed();
  });


  // reserveNFTs reserves 10 NFTs for the owner.
  it("Reserve NFTs should 10 NFTs reserved", async function () {
    let txn = await contract.reserveNFTs();
    await txn.wait();
    expect(await contract.balanceOf(owner.address)).to.equal(10);
  });
});
