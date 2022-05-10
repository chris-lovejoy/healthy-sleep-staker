const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sleep Staker", function () {
  it("Creating challenge emits event", async function () {
    const Staker = await ethers.getContractFactory("SleepStaker");
    const staker = await Staker.deploy();
    await staker.deployed();

    await expect(staker.createChallenge(10, 10, 10, 10))
      .to.emit(staker, 'ChallengeCreated')
      .withArgs(10, 10, 10, 10);
  });
});
