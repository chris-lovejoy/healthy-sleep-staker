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
        // TODO: consider adding a 'challenge complete' parameter
    }

    Challenge[] public challenges;

    mapping(uint => address[]) challengers;

    event ChallengeCreated(uint id, uint256 startDate, uint256 endDate, uint32 sleepHours, uint256 stakeAmount);
    // TODO: add event for challenger joined

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

    function stake(uint _challengeId) public payable returns (uint256) {
        uint256 requiredStake = challenges[_challengeId].stakeAmount;
        require(msg.value == requiredStake, "Incorrect amount");
        challengers[_challengeId].push(msg.sender);
    }
    
    function viewChallengers (uint _challengeId) public returns (address[] memory) {
        return challengers[_challengeId];
    }


    // function - timeleft OR daysleft [if function required]



    // function - check who met the requirements [ie. slept enough]
        // or rather - allow people to add their amount of sleep
        // ()

    // (iv) mapping - record of amount of sleep completed [added via oura ring]


    // function - execute redistribute at the end
        // requires everybody to have submitted sleep results

}
