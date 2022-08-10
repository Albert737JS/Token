const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Token", function () {
  async function deployToken() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    return { token, owner, otherAccount };
  }

  describe("Mint", function () {
    it("Should deposit with correct args: ", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployToken);

      await token.mint(owner.address, 1000);
      expect(await token.balanceOf(owner.address)).to.equal(1000);
      expect(await token.totalSupply()).to.equal(1000);
      
    });
  });

  describe("Burn", function () {
    it("Should deposit with correct args: ", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployToken);

      await token.mint(owner.address, 1000);
      expect(await token.balanceOf(owner.address)).to.equal(1000);
      expect(await token.totalSupply()).to.equal(1000);
      
    });
  });

  describe("AddToWhiteList", function () {
    it("Should deposit with correct args: ", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployToken);

      await token.addUserToWhiteList(owner.address);
    });
  });

  describe("Buy", function () {
    it("Should deposit with correct args: ", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployToken);

      await token.buy();
      expect(await token.balanceOf(owner.address)).to.equal(1000);
    });
  });

  describe("Sell", function () {
    it("Should deposit with correct args: ", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployToken);

      await token.sell(owner.address, 1000);
      expect(await token.balanceOf(owner.address)).to.equal(1000);
      expect(await token.totalSupply()).to.equal(1000);
    });
  });

});
