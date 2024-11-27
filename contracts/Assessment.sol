// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    struct Subscription {
        string name;
        bool isActive;
        uint256 duration; // duration in months
    }

    mapping(address => Subscription) public subscriptions;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event balanceMultiplied(uint256 multiplier, uint256 newBalance);
    event SubscriptionAdded(address user, string name, uint256 duration, uint256 cost);
    event SubscriptionCanceled(address user, string name, uint256 refund);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public payable{
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }
    //function that multiplies the balance amount
    function multiplyBalance(uint256 multiplier) public payable{
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;

        balance *= multiplier;

        assert((balance == _previousBalance * multiplier));

        emit balanceMultiplied(multiplier, balance);

    }
    //function that adds subcription that deducts from the balance amount
    function addSubscription(string memory name, uint256 duration) public {
        uint256 cost;
        if (duration == 1) cost = 35;
        else if (duration == 3) cost = 60;
        else if (duration == 12) cost = 120;
        else revert("Invalid subscription duration");

        require(balance >= cost, "Insufficient balance for subscription");

        subscriptions[msg.sender] = Subscription({
            name: name,
            isActive: true,
            duration: duration
        });

        balance -= cost;

        emit SubscriptionAdded(msg.sender, name, duration, cost);
    }
    //function that cancels subscription if there is an active subscription
    function cancelSubscription() public {
        Subscription storage userSub = subscriptions[msg.sender];
        require(userSub.isActive, "No active subscription to cancel");

        uint256 refund;
        if (userSub.duration == 1) refund = 35;
        else if (userSub.duration == 3) refund = 60;
        else if (userSub.duration == 12) refund = 120;

        userSub.isActive = false;

        balance += refund;

        emit SubscriptionCanceled(msg.sender, userSub.name, refund);
    }
    //function that view subscription details
    function viewSubscription() public view returns (string memory, bool, uint256) {
        Subscription memory userSub = subscriptions[msg.sender];
        return (userSub.name, userSub.isActive, userSub.duration);
    }
}
