//SPDX-License-Identifier: MIT

// (currently being developed within the eth-scaffold framework)

pragma solidity 0.8.4;

import './ExampleExternalContract.sol';
import 'hardhat/console.sol';


contract SleepStaker {

    struct Challenge {
        uint256 startDate;
        uint256 endDate;
        uint32 sleepHours;
        uint256 stakeAmount;
        uint amountStaked;
    }

    Challenge[] public challenges;
    mapping(uint => address[]) public challengers;
    mapping(address => uint) public hoursSlept;
    mapping(uint => bool) public challengeCompleted;
    mapping(uint => address[]) public challengeWinners;

    event ChallengeCreated(uint id, uint256 startDate, uint256 endDate, uint32 sleepHours, uint256 stakeAmount);
    event ChallengerJoined(uint challengeId, address challenger);

    constructor () {

    }

    function createChallenge (uint256 _startDate, uint256 _endDate, uint32 _sleepHours, uint256 _stakeAmount) public returns (uint) {
        challenges.push(Challenge(_startDate, _endDate, _sleepHours, _stakeAmount, 0));
        uint id = challenges.length - 1;
        emit ChallengeCreated(id, _startDate, _endDate, _sleepHours, _stakeAmount);
        return id;
    }

    function viewChallenge (uint _challengeId) public view returns(uint256, uint256, uint256, uint256) {
        Challenge memory selectedChallenge;
        selectedChallenge = challenges[_challengeId];
        return (selectedChallenge.startDate, selectedChallenge.endDate, selectedChallenge.sleepHours, selectedChallenge.stakeAmount);
    }

    // TODO: consider re-naming to 'join challenge'
    function stake(uint _challengeId) public payable {
        uint256 requiredStake = challenges[_challengeId].stakeAmount;
        require(msg.value == requiredStake, "Incorrect amount");
        challenges[_challengeId].amountStaked += requiredStake;
        challengers[_challengeId].push(msg.sender);
        emit ChallengerJoined(_challengeId, msg.sender);
    }
    
    function viewChallengers (uint _challengeId) public view returns (address[] memory) {
        address[] memory challengerList = challengers[_challengeId];
        return challengerList; 
    }

    function checkContractBalance() public view returns (uint) {
        uint contractBalance = address(this).balance;
        return contractBalance;
    }

    function addSleepData (uint _sleepRecordHours) public {
        hoursSlept[msg.sender] = _sleepRecordHours;
    }

    function assessDataUpload (uint _challengeId) public {
        address[] memory challengerList = challengers[_challengeId];
        challengeCompleted[_challengeId] = true;
        for (uint i = 0; i < challengerList.length; i++) {
            if (hoursSlept[challengerList[i]] == 0) {
                challengeCompleted[_challengeId] = false;
            }
        }
    }

    function checkDataUpload (uint _challengeId) public view returns(bool) {
        return challengeCompleted[_challengeId];
    }

    function identifyChallengeWinners (uint _challengeId) public {
        address[] memory challengerList = challengers[_challengeId];
        for (uint i = 0; i < challengerList.length; i++) {
            if (hoursSlept[challengerList[i]] >= challenges[_challengeId].sleepHours) {
                challengeWinners[_challengeId].push(challengerList[i]);
                }
            }
    }

    function withdraw(uint _challengeId) public {
        require(challengeCompleted[_challengeId] == true, "Challenge not completed yet");
        uint numWinners = challengeWinners[_challengeId].length;
        uint winAmount = challenges[_challengeId].amountStaked / numWinners;
        for (uint i=0; i < numWinners; i++) {
            (bool sent, ) = challengeWinners[_challengeId][i].call{value: winAmount}("");
            require(sent, "Failed to send to address");
        }
    }

}
