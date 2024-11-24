# Smart Contract Management - Metacrafters ATM Web
This project is part of the 4th Metacrafters Project for Module 2 on `Smart Contract Management - ETH + AVAX`. It demonstrates the use of Solidity smart contracts and React to create a decentralized ATM system where users can:
- Deposit funds
- Withdraw funds
- Multiply their balance
The project includes functionalities for managing account balances securely on the Ethereum blockchain.

The baseline of this code is from `https://github.com/MetacrafterChris/SCM-Starter.git`

## Requirements
To deploy and interact with this contract website. Must have the following requirements:
- node.js
- npm
- hardhat
- Solidity
- Ethereum wallet (Metamask)

## Features
1. Deposit Funds
    - Allows users (contract owner) to deposit a specified amount into their account.

2. Withdraw Funds
    - Enables the withdrawal of funds from the account balance, ensuring sufficient funds exist.

3. Multiply Balance
    - Allows users to multiply their balance by a specified factor.

4. Event Listening
    - Real-time updates are provided for transactions, including balance multiplications.

5. Owner-Restricted Access
    - Only the contract owner is allowed to perform these actions, ensuring account security.

## Installation
1. Clone the repository in any location on your desktop:
    ```bash
    git clone https://github.com/vpquieng/Smart-contract-management.git
    ```
2. Open the cloned folder.
3. Install dependencies in Visual Studio Code Terminal:
    ```bash
    npm install
    ```
After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end. Next is run the localhost at http://localhost:3000/

## Events
The following events are emitted during interactions with the smart contract:
- `Deposit(uint256 amount)`: Fired when funds are deposited.
- `Withdraw(uint256 amount)`: Fired when funds are withdrawn.
- `balanceMultiplied(uint256 multiplier, uint256 newBalance)`: Fired when the balance is multiplied.

## How to use
1. Open the web application in your browser.
2. Connect your MetaMask wallet.
3. Perform the following actions:
    - Deposit funds using the "Deposit" button.
    - Withdraw funds using the "Withdraw" button.
    - Multiply the balance using the "Multiply Balance" button.

## Contributors
- **Vincent Paul Quieng** - Developer 

## License 
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
