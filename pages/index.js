import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [subscription, setSubscription] = useState(undefined);
  const [inputValue, setInputValue] = useState({ deposit: 0, withdraw: 0, multiply: 0, subscriptionName: "Netflix", subscriptionDuration: 1}); 

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);

    //This listens to the balanceMultiplied event
    atmContract.on("balanceMultiplied", (multiplier, newBalance) => {
      console.log("Balance is multiplied by: ${multiplier}, The new balance: ${newBalance}");
      setBalance(ethers.utils.formatEther(newBalance)); //this will update balance in the UI
    });
  };

  const getBalance = async() => {
    if (atm) {
      const balanceNumber = await atm.getBalance();
      setBalance(ethers.utils.formatEther(balanceNumber))
    }
  }
  //handles all input changes
  const handleInputChange = (e) => {
    setInputValue({...inputValue, [e.target.name]: e.target.value})
  }

  const deposit = async() => {
    if (atm) {
      const amount = ethers.utils.parseEther(inputValue.deposit.toString());
      const tx = await atm.deposit(amount);
      await tx.wait();
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      const amount = ethers.utils.parseEther(inputValue.withdraw.toString());
      const tx = await atm.withdraw(amount);
      await tx.wait();
      getBalance();
    }
  }

  const multiplyBalance = async(multiplier) => {
    if(atm){
      const multiplier = parseInt(inputValue.multiply);
      let tx = await atm.multiplyBalance(multiplier);
      await tx.wait();
    }
  };
  const addSubscription = async () => {
    if (atm) {
      try {
        const tx = await atm.addSubscription(
          inputValue.subscriptionName,
          parseInt(inputValue.subscriptionDuration)
        );
        await tx.wait();
        getBalance();
        alert("Subscription successfully subscribe");
      } catch (error) {
        console.error("Failed adding subscription:", error);
        alert("Please check your balance.");
      }
    }
  };
  const cancelSubscription = async () => {
    if (atm) {
      try {
        const tx = await atm.cancelSubscription();
        await tx.wait();
        getBalance();
        alert("Subscription successfully canceled");
      } catch (error) {
        console.error("Failed canceling subscription:", error);
        alert("Make sure your subscription is active.");
      }
    }
  };
  const viewSubscription = async () => {
    if (atm) {
      try {
        const subscriptionDetails = await atm.viewSubscription();
        setSubscription({
          name: subscriptionDetails[0],
          isActive: subscriptionDetails[1],
          duration: subscriptionDetails[2].toString()
        });
      } catch (error) {
        console.error("Failed viewing subscription:", error);
        alert("There are no subscriptions.");
      }
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <div>
          <input
            type="number"
            name="deposit"
            placeholder="Deposit Amount"
            onChange={handleInputChange}
          />
          <button onClick={deposit}>Deposit</button>
        </div>
        <div>
          <input
            type="number"
            name="withdraw"
            placeholder="Withdraw Amount"
            onChange={handleInputChange}
          />
          <button onClick={withdraw}>Withdraw</button>
        </div>
        <div>
          <input
            type="number"
            name="multiply"
            placeholder="Multiply Balance"
            onChange={handleInputChange}
          />
          <button onClick={multiplyBalance}>Multiply Balance</button>
        </div>
        <div>
          <h2>Subscription Service</h2>
          <select
            name="subscriptionName"
            onChange={handleInputChange}
            value={inputValue.subscriptionName}
          >
            <option value="Netflix">Netflix</option>
            <option value="Bilibili">Bilibili</option>
            <option value="Disney+">Disney+</option>
          </select>
          <select
            name="subscriptionDuration"
            onChange={handleInputChange}
            value={inputValue.subscriptionDuration}
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="12">1 Year</option>
          </select>
          <button onClick={addSubscription}>Subscribe</button>
          <button onClick={cancelSubscription}>Cancel Subscription</button>
          <button onClick={viewSubscription}>View Subscription</button>
          {subscription && (
            <div>
              <h3>Subscription Details</h3>
              <p>
                Subscription: {subscription.name} <br />
                Active: {subscription.isActive ? "Active" : "Inactive"} <br />
                Duration: {subscription.duration} Months
              </p>
          </div>
          )}
        </div>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Vpquieng's ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
