const hre = require("hardhat");

async function main() {

  const SleepStaker = await hre.ethers.getContractFactory("SleepStaker");
  const sleepstaker = await SleepStaker.deploy();

  await sleepstaker.deployed();

  console.log("Sleep Staker deployed to:", sleepstaker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
