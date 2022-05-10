import './App.css';
import React, {useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from './hardhat/artifacts/contracts/SleepStaker.sol/SleepStaker.json';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const sleepStakerContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // to modiofy
  const sleepStakerABI = abi.abi;


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


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [selChallengeId, setSelChallengeId] = useState("");
  const [showChallengeDetails, setShowChallengeDetails] = useState();

  const handleStartDateChange = (event) => {
    console.log("Start Date:", event.target.value)
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event) => {
    console.log("End Date:", event.target.value)
    setEndDate(event.target.value)
  }

  const handleSleepHoursChange = (event) => {
    console.log("Total hours of sleep", event.target.value)
    setSleepHours(event.target.value)
  }

   const handleStakeAmountChange = (event) => {
    console.log("Stake Amount", event.target.value)
    setStakeAmount(event.target.value)
  }

  const handleSelChallengeIdChange = (event) => {
    console.log("Challenge Id selected:", event.target.value)
    setSelChallengeId(event.target.value);
  }

  const submit_challenge = async event => {
    event.preventDefault()

    try {
      const { ethereum } = window;

      if (ethereum) {
        // const provider = new ethers.providers.JsonRpcProvider();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
        
        sleepStakerContract.createChallenge(startDate, endDate, sleepHours, stakeAmount)

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const viewChallenge = async event => {
    event.preventDefault()
    console.log(selChallengeId)
    setShowChallengeDetails(1);
  }

  const stakeToJoin = async event => {
    event.preventDefault();
    console.log(stakeAmount);

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
        
        sleepStakerContract.stake(selChallengeId);
      } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Welcome to the Healthy Sleep Staker</h1>
      <p>(add a description here + an icon).</p> 
      <p>Note: The challenge starts on and ends at 12pm (noon) on the respective days.</p>

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

      <h2>Create a challenge</h2>
          <form onSubmit={submit_challenge}>
            <div>Starting date: 
              <input
                placeholder="format: YYYY-MM-DD" 
                value={startDate}
                onChange={handleStartDateChange}
                />
            </div>
            <div>End date: 
              <input
                placeholder="format: YYYY-MM-DD" 
                value={endDate}
                onChange={handleEndDateChange}
                />
            </div>
            <div>Total hours to sleep (target):
              <input
                value={sleepHours}
                onChange={handleSleepHoursChange}
                />
            </div>
            <div>Stake amount (ROSE):
              <input
                value={stakeAmount}
                onChange={handleStakeAmountChange}
                />
            </div>

            <button type='submit'>Submit challenge to the Oasis blockchain</button>
          </form>


          {/* TEMPORARY TEXT - FOR DEVELOPMENT */}
           <p>The starting date is {startDate}, the ending date is {endDate} and 
            the average number of hours to sleep is {sleepHours}. Is this correct?</p>

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
                <p>(other challenges details to be added here - as an unordered list)</p>
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
