//SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import './ExampleExternalContract.sol';
import 'hardhat/console.sol';


contract SleepStaker {

   struct Challenge {
        uint256 startDate;
        uint256 endDate;
        uint32 sleepHours;
        uint256 stakeAmount;
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
        challenges.push(Challenge(_startDate, _endDate, _sleepHours, _stakeAmount));
        uint id = challenges.length - 1;
        emit ChallengeCreated(id, _startDate, _endDate, _sleepHours, _stakeAmount);
        return id;
    }

    function viewChallenge (uint _challengeId) public view returns(uint256, uint256, uint256, uint256) {
        Challenge memory selectedChallenge;
        selectedChallenge = challenges[_challengeId];
        console.log(selectedChallenge.startDate);
        return (selectedChallenge.startDate, selectedChallenge.endDate, selectedChallenge.sleepHours, selectedChallenge.stakeAmount);
    }

    function stake(uint _challengeId) public payable {
        uint256 requiredStake = challenges[_challengeId].stakeAmount;
        require(msg.value == requiredStake, "Incorrect amount");
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



    // function withdraw () {
        // require challenge to be completed
        // looks at length of winners list
        // divides amount in contract by amount of the winners + redistributes
    // }


}
