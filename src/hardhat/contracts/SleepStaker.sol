//SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import './ExampleExternalContract.sol';
import 'hardhat/console.sol';


contract SleepStaker {

    // ExampleExternalContract public exampleExternalContract; // TODO: rename later

    struct Challenge {
        uint256 startDate;
        uint256 endDate;
        uint32 sleepHours;
        uint256 stakeAmount;
    }

    // TODO: consider making mapping for challenge creator? (as per:
    // https://github.com/Nateliason/smart-contract-examples/blob/master/03%20CryptoZombies/06_FinalLevel6/ZombieFactory.sol

    Challenge[] public challenges;

    event ChallengeCreated(uint256 startDate, uint256 endDate, uint32 sleepHours, uint256 stakeAmount);

    // variables to add:
    // (i) mapping - record of balances put in
    // (ii) total_sleep_hours required
    // (iii) deadline (time)
    // (iv) mapping - record of amount of sleep completed [added via oura ring]

    constructor () {

    }

    function createChallenge (uint256 _startDate, uint256 _endDate, uint32 _sleepHours, uint256 _stakeAmount) public {
        uint id = 1; // TODO: update to gradually increment
        challenges.push(Challenge(_startDate, _endDate, _sleepHours, _stakeAmount));
        emit ChallengeCreated(_startDate, _endDate, _sleepHours, _stakeAmount);
    }

    // function viewChallenge (uint _challengeId) public returns(unit256) {
        // Initially, just report challenge with id 1 - to update later
        // challenge = challenges[_challengeId];
        // return 2; // challenge.startDate;
    // }


    // function - stake


    // function - set sleep hour target


    // function - timeleft


    // function - check who met the requirements [ie. slept enough]
        // ()


    // function - execute redistribute at the end

}
