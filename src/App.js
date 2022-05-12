import './App.css';
import React, {useState, useEffect } from "react";
import CreateChallenge from './CreateChallenge';
import JoinChallenge from './JoinChallenge';
import ConcludeChallenge from './ConcludeChallenge';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");

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


  return (
    <div className="App">
      <h1>🛌 Welcome to the Healthy Sleep Staker 💪</h1>
      <p><b>Have you ever wanted to develop good sleep habits, but struggled to find the motivation?</b></p>
      <p>Sleep habits are important, because quality and quantity of sleep affects us in many ways; 
        it influences our mood, our performance, and our long-term health outcomes</p> 
      <p>The Healthy Sleep Staker enables you to create sleep challenges, and commit money to achieving your goals.</p>
      <p>Everybody puts in some ROSE tokens. At the end of the challenge, the pot is divided between all those who completed the challenge.</p>
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
      <JoinChallenge />
      <ConcludeChallenge />

    </div>
  );
}

export default App;
