require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });
 
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      // accounts: 
    },
    hardhat: {
      chainId: 1337
    },
    // mumbai: {
    //   // url: "https://rpc-mumbai.maticvigil.com",
    //   // url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/polygon/mumbai", // <---- YOUR MORALIS ID! (not limited to infura)
    //   // gasPrice: 3200000000,
    //   // accounts: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    // },
    emerald_mainnet: {
      chainId: 42262,
      url: "https://emerald.oasis.dev",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    emerald_testnet: {
      url: "https://testnet.emerald.oasis.dev",
      chainId: 42261,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    emerald_local: {
      url: "http://localhost:8545",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  mocha: {
    timeout: 60000
  },
  solidity: "0.8.4",
};
