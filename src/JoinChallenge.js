import React, {useState, useEffect} from 'react'
import { ethers } from "ethers";
import abi from './hardhat/artifacts/contracts/SleepStaker.sol/SleepStaker.json';
import BigNumber from 'bignumber.js';

const sleepStakerContractAddress = "0xd63d85a5d053f37850998Ac42d00CC275728c3fE"; // Emerald Testnet
const sleepStakerABI = abi.abi;

export default function JoinChallenge() {


    const [selChallengeId, setSelChallengeId] = useState("");
    const [showChallengeDetails, setShowChallengeDetails] = useState();

    const [challStartDate, setChallStartDate] = useState("");
    const [challEndDate, setChallEndDate] = useState("");
    const [challSleepHours, setchallSleepHours] = useState("");
    const [challStakeAmount, setChallStakeAmount] = useState("");
    // const [stakeDisplay, setStakeDisplay] = useState("");


  const handleSelChallengeIdChange = (event) => {
    // console.log("Challenge Id selected:", event.target.value)
    setSelChallengeId(event.target.value);

    setChallStartDate("");
    setChallEndDate("");
    setchallSleepHours("");
    setChallStakeAmount("");
  }


    // useEffect(() => {
    //     setStakeDisplay(parseFloat((challStakeAmount) / 1000000000000000000).toString());
    //     console.log("Stake amount now", stakeDisplay);
    // }, [challStakeAmount, stakeDisplay])

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

        // const ROSE_display_float = ;
        // const ROSE_display_string = ROSE_display_float.toString();
        // (ROSE_display_string);

      } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    }

    setShowChallengeDetails(1);
  }

  const hideChallenge = async event => {
      event.preventDefault()
      setShowChallengeDetails();
  }

  const stakeToJoin = async event => {
    event.preventDefault();

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
        
        const joinChallengeTx = await sleepStakerContract.joinChallenge(selChallengeId, {value: challStakeAmount});
        console.log("Successfully joined challenge. Transaction ID: ", joinChallengeTx.hash)


      } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    }
  }



  return (
    <div>
    <h2>Join a challenge</h2>
        
      <div>
          <p>Select challenge:</p> 
          <input
            value={selChallengeId}
            placeholder="enter challenge ID"
            onChange={handleSelChallengeIdChange}
            />
      </div>

      {!showChallengeDetails && (
          <>
            <div>
                <p> </p>
                <button onClick={viewChallenge}>View challenge details</button>
            </div>
          </>
      )}

      {showChallengeDetails && (
      <>
        <div>
            <p> </p>
            <button onClick={hideChallenge}>Hide challenge details</button>
            <h4>Challenge details:</h4>
            <p>Challenge ID: {selChallengeId}</p>
            <p>Starting Date: {challStartDate}</p>
            <p>End Date: {challEndDate}</p>
            <p>Sleep target (hours): {challSleepHours}</p>
            <p>Stake amount (ROSE): {challStakeAmount/1000000000000000000}</p>
        </div>
      </>
    )}


      <div>
        <h4>Join below:</h4>
        <p>Stake {challStakeAmount/1000000000000000000} ROSE to join challenge {selChallengeId}:</p>
        <button onClick={stakeToJoin}>Stake</button>
      </div>
      </div>

  )
}
