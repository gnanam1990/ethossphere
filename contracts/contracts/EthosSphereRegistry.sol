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

    /// @notice Contract owner, allowed to manage the authorized-updater set.
    address public owner;

    /// @notice Addresses permitted to mutate reputation state (score updaters).
    mapping(address => bool) public isAuthorized;

    event ScoreUpdated(address indexed user, uint256 newScore);
    event AuthorizationChanged(address indexed account, bool authorized);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyAuthorized() {
        require(isAuthorized[msg.sender], "Unauthorized");
        _;
    }

    constructor() {
        owner = msg.sender;
        // The deployer is authorized to update scores by default.
        isAuthorized[msg.sender] = true;
        emit OwnershipTransferred(address(0), msg.sender);
        emit AuthorizationChanged(msg.sender, true);
    }

    /// @notice Grant or revoke a score-updater's authorization.
    function setAuthorized(address account, bool authorized) external onlyOwner {
        require(account != address(0), "Zero address");
        isAuthorized[account] = authorized;
        emit AuthorizationChanged(account, authorized);
    }

    /// @notice Transfer contract ownership.
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }

    /// @notice Update a user's reputation score. Restricted to authorized updaters
    ///         so scores cannot be forged by arbitrary callers.
    function updateScore(address user, uint256 newScore) external onlyAuthorized {
        profiles[user].ethosScore = newScore;
        emit ScoreUpdated(user, newScore);
    }
}
