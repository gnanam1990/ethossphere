// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EthosSphereRegistry {
    struct UserProfile {
        uint256 ethosScore;
        uint256 benefitTier;
        uint256 penaltyLevel;
        uint256 recoveryStage;
    }

    mapping(address => UserProfile) public profiles;

    event ScoreUpdated(address indexed user, uint256 newScore);

    function updateScore(address user, uint256 newScore) external {
        profiles[user].ethosScore = newScore;
        emit ScoreUpdated(user, newScore);
    }
}

