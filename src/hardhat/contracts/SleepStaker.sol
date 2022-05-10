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

    Challenge[] public challenges;

    event ChallengeCreated(uint id, uint256 startDate, uint256 endDate, uint32 sleepHours, uint256 stakeAmount);

    // variables to add:
    // (i) mapping - record of balances put in
    // (ii) total_sleep_hours required
    // (iii) deadline (time)
    // (iv) mapping - record of amount of sleep completed [added via oura ring]

    constructor () {

    }

    function createChallenge (uint256 _startDate, uint256 _endDate, uint32 _sleepHours, uint256 _stakeAmount) public {
        challenges.push(Challenge(_startDate, _endDate, _sleepHours, _stakeAmount));
        uint id = challenges.length - 1;
        emit ChallengeCreated(id, _startDate, _endDate, _sleepHours, _stakeAmount);
    }

    function viewChallenge (uint _challengeId) public view returns(uint256) {
        Challenge memory selectedChallenge;
        selectedChallenge = challenges[_challengeId];
        console.log(selectedChallenge.startDate);
        return selectedChallenge.startDate; // temporary: use this for testing
        // return selectedChallenge.startDate, selectedChallenge.endDate, selectedChallenge.sleepHours, selectedChallenge.stakeAmount;
    }


    // function - stake


    // function - set sleep hour target


    // function - timeleft


    // function - check who met the requirements [ie. slept enough]
        // ()


    // function - execute redistribute at the end

}
