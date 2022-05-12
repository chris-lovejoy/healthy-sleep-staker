import './App.css';
import React, {useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from './hardhat/artifacts/contracts/SleepStaker.sol/SleepStaker.json';
import BigNumber from 'bignumber.js';
import CreateChallenge from './CreateChallenge';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const sleepStakerContractAddress = "0xd63d85a5d053f37850998Ac42d00CC275728c3fE"; // Emerald Testnet
  const sleepStakerABI = abi.abi;

  const oasisGreeterContractAddress = "0x6069311C737c0A6Fe4Fc84c6c67d80D6822eDeD3";

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
  checkIfWalletIsConnected();
  }, [])


  const [selChallengeId, setSelChallengeId] = useState("");
  const [showChallengeDetails, setShowChallengeDetails] = useState();

  // Viewing a previous challenge
  const [challStartDate, setChallStartDate] = useState("");
  const [challEndDate, setChallEndDate] = useState("");
  const [challSleepHours, setchallSleepHours] = useState("");
  const [challStakeAmount, setChallStakeAmount] = useState("");


  

  const handleSelChallengeIdChange = (event) => {
    console.log("Challenge Id selected:", event.target.value)
    setSelChallengeId(event.target.value);
  }



  const viewChallenge = async event => {
    event.preventDefault()
    console.log("selected challenge ID", selChallengeId)

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);

        const challenge_details = await sleepStakerContract.viewChallenge(selChallengeId);
        const {0: var_1, 1: var_2, 2: var_3, 3: var_4} = challenge_details;
        setChallStartDate(new BigNumber(var_1._hex).toNumber());
        setChallEndDate(new BigNumber(var_2._hex).toNumber());
        setchallSleepHours(new BigNumber(var_3._hex).toNumber());
        setChallStakeAmount(new BigNumber(var_4._hex).toNumber());

        console.log(challenge_details);

      } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    }

    setShowChallengeDetails(1);
  }

  const stakeToJoin = async event => {
    event.preventDefault();
    // console.log(stakeAmount);

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
        
        sleepStakerContract.stake(selChallengeId, {value: ethers.utils.parseEther("0.001")});
      } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>🛌 Welcome to the Healthy Sleep Staker 💪</h1>
      <p>(add a description here + an icon).</p> 
      <p><em>Note: The challenge starts on and ends at 12pm (noon) on the respective days.</em></p>

      {!currentAccount && (
        <>
          <div className="bio">
            Connect your Ethereum wallet to get started:
          </div>
          <button className="runButton" onClick={connectWallet}>
              Connect Wallet
            </button>
            </>
        )}

      <CreateChallenge />

      <h2>Join a challenge</h2>
      
          <div>Enter the challenge Id: 
              <input
                value={selChallengeId}
                onChange={handleSelChallengeIdChange}
                />
          </div>

          <div>
              <button onClick={viewChallenge}>View challenge details</button>
          </div>

          {showChallengeDetails && (
          <>
            <div>
                <h4>Challenge details:</h4>
                <p>Challenge ID: {selChallengeId}</p>
                <p>Starting Date: {challStartDate}</p>
                <p>End Date: {challEndDate}</p>
                <p>Sleep target (hours): {challSleepHours}</p>
                <p>Stake amount (ROSE): {challStakeAmount}</p>
 
            </div>
          </>
        )}


          <div>
            <h4>Join below:</h4>
            <p>Stake ROSE to join challenge {selChallengeId}:</p>
            <button onClick={stakeToJoin}>Stake</button>
          </div>

      <h2>Conclude a challenge</h2>

    </div>
  );
}

export default App;
