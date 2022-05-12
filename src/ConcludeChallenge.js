import React, {useState} from 'react'
import { ethers } from "ethers";
import abi from './hardhat/artifacts/contracts/SleepStaker.sol/SleepStaker.json';

const sleepStakerContractAddress = "0xd63d85a5d053f37850998Ac42d00CC275728c3fE"; // Emerald Testnet
const sleepStakerABI = abi.abi;

export default function ConcludeChallenge() {

    const [hoursSlept, setHoursSlept] = useState("");

    const handleHoursSleptChange = (event) => {
        console.log("Hours slept: ", event.target.value)
        setHoursSlept(event.target.value);
    }

    
  const submitHoursSlept = async event => {
    event.preventDefault()
    console.log("Submitting hours slept...")

        try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);

            const submitSleepTx = await sleepStakerContract.addSleepData(hoursSlept);
            console.log("Sleep data successfully submitted. Transaction ID: ", submitSleepTx.hash)

        } else {
        console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error);
        }
    } 

    return (
        <div>
            <h2>Conclude a challenge</h2>
    
            <form onSubmit={submitHoursSlept}>
        <div>Enter your total sleep amount: 
            <input
            value={hoursSlept}
            onChange={handleHoursSleptChange}
            />
        </div>
        <button type='submit'>Submit Hours Slept</button>
        </form>

    
        </div>
    )
}


// Needs to: 
// (1) add Sleep Data
// (2) check everybody has added their sleep data
// (3) identify challenge winners
// (4) withdraw funds


