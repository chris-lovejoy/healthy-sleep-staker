import React, { useState } from 'react'
import { ethers } from "ethers";
import abi from './hardhat/artifacts/contracts/SleepStaker.sol/SleepStaker.json';
const sleepStakerContractAddress = "0xd63d85a5d053f37850998Ac42d00CC275728c3fE"; // Emerald Testnet
const sleepStakerABI = abi.abi;


export default function CreateChallenge() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

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

  const submitChallenge = async event => {
    event.preventDefault()

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
        
        const createChallengeTx = await sleepStakerContract.createChallenge(startDate, endDate, sleepHours, stakeAmount)

        console.log("Challenge successfully submitted. Transaction ID:", createChallengeTx.hash)
        
        // TODO: clear boxes (by updating states) after successful submission.

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
    <h2>Create a challenge</h2>
    <form onSubmit={submitChallenge}>
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
    </div>
  )
}
