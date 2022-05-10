import './App.css';
import React, {useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectWallet, checkIfWalletIsConnected } from './WalletConnect'
// TODO: add abi import



function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // to modiofy
  // const contractABI = abi.abi;


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

  const handleStartDateChange = (event) => {
    console.log(event.target.value)
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event) => {
    console.log(event.target.value)
    setEndDate(event.target.value)
  }

  const handleSleepHoursChange = (event) => {
    console.log(event.target.value)
    setSleepHours(event.target.value)
  }

   const handleStakeAmountChange = (event) => {
    console.log(event.target.value)
    setStakeAmount(event.target.value)
  }


  return (
    <div className="App">
      <h1>Welcome to the Healthy Sleep Staker</h1>

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
          <form>
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
            <div>Average number of hours to sleep:
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
          </form>

          {/* TEMPORARY TEXT - FOR DEVELOPMENT */}
           <p>The starting date is {startDate}, the ending date is {endDate} and 
            the average number of hours to sleep is {sleepHours}. Is this correct?</p>

      <h2>Join a challenge</h2>



      <h2>Conclude a challenge</h2>

    </div>
  );
}

export default App;
