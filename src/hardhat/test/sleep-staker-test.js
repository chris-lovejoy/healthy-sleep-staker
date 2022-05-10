const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sleep Staker", function () {
    it("Should return challenge details after created", async function () {
        const Staker = await ethers.getContractFactory("SleepStaker");
        const staker = await Staker.deploy();
        await staker.deployed();
    
        const addChallengeTx = await staker.createChallenge(10, 11, 12, ethers.utils.parseEther("0.001"));
        await addChallengeTx.wait()
        expect(await staker.viewChallenge(0)).to.equal(10);
    });

    it("Creating challenge emits event", async function () {
        const Staker = await ethers.getContractFactory("SleepStaker");
        const staker = await Staker.deploy();
        await staker.deployed();

        await expect(staker.createChallenge(10, 11, 12, ethers.utils.parseEther("0.001")))
            .to.emit(staker, 'ChallengeCreated')
            .withArgs(0, 10, 11, 12, ethers.utils.parseEther("0.001"));
    });

    it("Should return many challenge details after many challenges created", async function () {
        const Staker = await ethers.getContractFactory("SleepStaker");
        const staker = await Staker.deploy();
        await staker.deployed();
    
        const addChallengeTx = await staker.createChallenge(10, 11, 12, 13);
        await addChallengeTx.wait()

        const addChallengeTx2 = await staker.createChallenge(14, 15, 16, 17);
        await addChallengeTx2.wait()

        const addChallengeTx3 = await staker.createChallenge(18, 19, 20, 21);
        await addChallengeTx3.wait()

        expect(await staker.viewChallenge(1)).to.equal(14);
        expect(await staker.viewChallenge(2)).to.equal(18);
    });

    it("Initial test of stake()", async function() {
        const Staker = await ethers.getContractFactory("SleepStaker");
        const staker = await Staker.deploy();
        await staker.deployed();

        const addChallengeTx = await staker.createChallenge(10, 11, 12, ethers.utils.parseEther("0.001"));
        await addChallengeTx.wait()

        const stakeResult = await staker.stake(0, {value: ethers.utils.parseEther("0.001")});
        console.log('\t'," 🏷  stakeResult: ",stakeResult.hash)

    });
    it("Initial test of viewChallengers()", async function() {
        const Staker = await ethers.getContractFactory("SleepStaker");
        const staker = await Staker.deploy();
        await staker.deployed();

        const addChallengeTx = await staker.createChallenge(10, 11, 12, ethers.utils.parseEther("0.001"));
        await addChallengeTx.wait()

        const stakeResult = await staker.stake(0, {value: ethers.utils.parseEther("0.001")});
        console.log('\t'," 🏷  stakeResult: ",stakeResult.hash)

        const viewChallengersTx = await staker.viewChallengers(0);
        await viewChallengersTx.wait()
        console.log('\t'," 🏷  viewChallengersResult: ",viewChallengersTx.hash)

    })
});
