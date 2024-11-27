# Smart Contract Management - ETH + AVAX / Metacrafters ATM Subscription Service
This is my 4th Metacrafters project, it is a solidity smart contract that allows the user to deposit, withdraw, and multiply balance. In addition, the system subscription service handles wallet balances.

## Project Overview

This project implements a smart contract that interacts with Ethereum, featuring functionality such as:

- **Deposit**: Users can deposit ETH/AVAX into the contract.
- **Withdraw**: Users can withdraw their balances.
- **Balance Multiplication**: Users can multiply their balance using contract functionality.
- **Subscription Service**: Wallet balances are managed according to subscription plans.

## Requirements 
- Node.js
- npm
- Hardhat
- Solidity
- Ethereum Wallet(MetaMask)

## How to Install
1. Clone the repository in your desired location:
    ```sh
    git clone https://github.com/vpquieng/Smart-contract-management.git
    ```
2. Open the cloned folder.
3. Install dependencies:
    ```sh
    npm install
    ```
After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end then run the localhost which is Typically at http://localhost:3000/

## How to Use

1. **Open the Website**:  
   Once the project is running locally, open your web browser and go to `http://localhost:3000/`.
2. **Connect MetaMask**:  
   Make sure your MetaMask wallet is connected to the **Hardhat Network** (default local blockchain). You can connect your MetaMask wallet by clicking the "Connect Wallet" button on the website.
3. **Perform Actions**:  
   You can perform the following actions directly from the website:
   - **Deposit**:  
     Enter the amount of ETH you'd like to deposit and click the "Deposit" button.
   - **Withdraw**:  
     Enter the amount of ETH you'd like to withdraw and click the "Withdraw" button.
   - **Multiply Balance**:  
     Click the "Multiply Balance" button to multiply your balance by a set factor.
   - **Subscribe**:  
     Choose a subscription name (eg. netflix), duration (e.g., one-month) and click "Subscribe" to pay for the plan using your balance.
4. **Check Subscription details**:  
   Click on the Subscription details button to view your subscription detail status.

## Contributors
- **Vincent Paul Quieng** - Developer 

## License 
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
