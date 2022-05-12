import React, {useState} from 'react'
import { ethers } from "ethers";
import abi from './hardhat/artifacts/contracts/SleepStaker.sol/SleepStaker.json';

const sleepStakerContractAddress = "0xd63d85a5d053f37850998Ac42d00CC275728c3fE"; // Emerald Testnet
const sleepStakerABI = abi.abi;

export default function ConcludeChallenge() {

    const [hoursSlept, setHoursSlept] = useState("");
    const [selChallengeId, setSelChallengeId] = useState("");
    const [challengeFinished, setChallengeFinished] = useState(false);
    const [reportNotFinished, setNotFinished] = useState();
    const [withdrawComplete, setWithdrawComplete] = useState(false);

    const handleHoursSleptChange = (event) => {
        console.log("Hours slept: ", event.target.value)
        setHoursSlept(event.target.value);
    }

    const handleSelChallengeIdChange = (event) => {
        console.log("Challenge Id selected:", event.target.value)
        setSelChallengeId(event.target.value);
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


    const checkFinished = async event => {
        event.preventDefault();
        console.log("Checking whether everybody has submitted their sleep data...")

        try {
            const { ethereum } = window;
    
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
    
                const checkFinishedTx = await sleepStakerContract.checkFinished(selChallengeId);
                console.log("Check complete. Transaction ID: ", checkFinishedTx.hash)

                const challengeStatus = await sleepStakerContract.checkDataUpload(selChallengeId);

                if (challengeStatus) {
                    console.log("Confirmed: Everybody has uploaded their sleep data. Ready to identify winners and distribute winnings.")
                    setChallengeFinished(true);
                    setNotFinished(false);
                } else {
                    console.log("Not everybody has uploaded their sleep data yet.")
                    setNotFinished(true);
                }
    
            } else {
            console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
            }
        } 

    const identifyWinners = async event => {
        event.preventDefault();
        console.log("Checking who the winners are...")

        try {
            const { ethereum } = window;
    
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
    
                const checkWinnersTx = await sleepStakerContract.identifyChallengeWinners(selChallengeId);
                console.log("Check complete. Transaction ID: ", checkWinnersTx.hash)

                // then view the winners - call viewChallenge Winners function
    
            } else {
            console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
            }

    }


    const distributeWinnings = async event => {
        event.preventDefault();

        console.log("Distributing the winnings...")

        try {
            const { ethereum } = window;
    
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const sleepStakerContract = new ethers.Contract(sleepStakerContractAddress, sleepStakerABI, signer);
    
                const distributeWinningsTx = await sleepStakerContract.withdraw(selChallengeId);
                console.log("Withdraw complete. Transaction ID: ", distributeWinningsTx.hash)
    
                setWithdrawComplete(true);

            } else {
            console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
            }
    }

    return (
        <div>
            <h2>Submit your hours slept</h2>
                <form onSubmit={submitHoursSlept}>
                    <div>Enter your total sleep amount: 
                        <input
                        value={hoursSlept}
                        onChange={handleHoursSleptChange}
                        />
                    </div>
                    <p> </p>
                    <button type='submit'>Submit Hours Slept</button>
                </form>

            <h2>Conclude a challenge</h2>
    
            <div>Select challenge: 
            <input
                value={selChallengeId}
                placeholder="enter challenge ID"
                onChange={handleSelChallengeIdChange}
                />
            </div>

        {!challengeFinished && (
        <>
            <div>
                <p>Has the challenge finished?*</p>
                <button onClick={checkFinished}>Click to see</button>
            </div>
        </>
        )}

        {reportNotFinished && (
            <>
                <div>
                    <p>No, not everybody has uploaded their sleep data yet.</p>
                </div>
            </>
        )}

        {challengeFinished && (
            <>
                <div>
                    <p>Yes! Everybody has uploaded their sleep data. Go ahead and click below to identify the winners and distribute the winnings.</p>

                    <button onClick={identifyWinners}>Identify Challenge Winners</button>
                    <p> </p>
                    <button onClick={distributeWinnings}>Distribute Winnings</button>
                </div>
            </>
        )}
        
        {withdrawComplete && (
            <>
                <div>
                    <p>Withdraw complete! (check your wallet)</p>
                </div>
            </>
        )}
        <p> </p>
        <p> </p>
        </div>
    )
}


