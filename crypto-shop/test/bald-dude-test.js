const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BaldDude", function () {
  it("Should mint an nft", async function () {
    const BaldDude = await hre.ethers.getContractFactory("BaldDude");
    const baldDude = await BaldDude.deploy();
  
    await baldDude.deployed();

    const recipient = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc";

    let balance = await baldDude.balanceOf(recipient);
    expect(balance).to.equal(0);
    metadataURI = 'cid/test.png';

    const MintedBaldDude = await baldDude.payToMint(recipient, metadataURI, {value : ethers.utils.parseEther('0.05') });

    await MintedBaldDude.wait();

    balance = await baldDude.balanceOf(recipient);

    expect(balance).to.equal(1);

    expect(await baldDude.isTokenOwned(metadataURI)).to.equal(true);
    
   
  });
});
