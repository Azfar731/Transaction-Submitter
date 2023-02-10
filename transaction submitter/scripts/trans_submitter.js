import Web3 from 'web3';
import dotenv from 'dotenv'

const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

console.log("Couldn't connect to localhost")

dotenv.config()

const contractAddress = process.env.Contract_Address;
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "data",
        "type": "uint256"
      }
    ],
    "name": "returnData",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_data",
        "type": "uint256"
      }
    ],
    "name": "updateData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "readData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);


export class Web{
   
  constructor(){
    // this.fromAddress = "0x8cdADB371Aab279DD6AaC610532b52A904bFd1Fe";
    this.fromAddress = process.env.From_Address;
    this.privateKey = process.env.Private_Key;
    this.account = web3.eth.accounts.privateKeyToAccount(this.privateKey);
    this.localNonce = 0;
  }
  createTransaction = async (_case,value = 0)=>{
    // let nonce = await web3.eth.getTransactionCount(this.fromAddress);
    const nonce = await this.getNonce();
    let gasPrice = await web3.eth.getGasPrice();
    let gasLimit = 100000;
    let data = undefined
    if(_case == 0){
      data = contractInstance.methods.updateData(value).encodeABI();
    }
    else if(_case == 1){
      console.log("executing readData method")
      data = contractInstance.methods.readData().encodeABI();
    }
    else{
      console.log("enter 0 or 1 as param to createTransaction");
      return
    }
    
    let rawTransaction = {
      "from": this.fromAddress,
      "nonce": web3.utils.toHex(nonce),
      "gasPrice": web3.utils.toHex(gasPrice),
      "gasLimit": web3.utils.toHex(gasLimit),
      "to": contractAddress,
      "value": "0x0",
      "data": data
    };
    return rawTransaction;
  }

  sendTransaction = async(rawTransaction)=>{
    
    const st = await this.checkbalance(rawTransaction);
    
    if(!st){
      return false;
    }

    const signedTransaction = await this.account.signTransaction(rawTransaction);
    try {
      const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      if (receipt.status === true) {
        console.log("Transaction was successful");
        return true;
      } else {
        console.log("Transaction failed");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
     

  }

  getNonce=async()=>{
    // const pendingtx = await web3.eth.pendingTransactions();
    const pendingTransactions = await web3.eth.getBlock('pending').transactions;
    let nonce = await web3.eth.getTransactionCount(this.fromAddress);
    if(pendingTransactions){
    for (let i = 0; i < pendingTransactions.length; i++) {
      const tx = pendingTransactions[i];
      if (tx.from === this.fromAddress) {
        nonce++;
      }
    }}
    if(nonce <= this.localNonce){
      this.localNonce = this.localNonce + 1;
      nonce = this.localNonce;
    }
    else{
      this.localNonce = nonce;
    }
    return nonce;
  }

  checkbalance=async(tx)=>{
    var balance = await web3.eth.getBalance(this.fromAddress);
    balance = web3.utils.toBN(balance)
    const gasPrice = web3.utils.toBN(tx.gasPrice);
    const gasLimit = web3.utils.toBN(tx.gasLimit);
    const totalCost = (gasPrice).mul(gasLimit);
    
    
    if(balance.gte(totalCost)) {
      return true;
    } else {
      console.log('The account does not have enough balance for gas.');
      return false;
    }
  }


  getValue= async()=>{
    const methodName = 'readData'
    const result = await contractInstance.methods[methodName]().call();
    return result;
    
  }
}



 

// logs = receipt.logs[0]
// console.log("after receipt")
// logs.forEach(log => {
//   // Check if the log is for the desired event
//   if (log.topics[0] === web3.utils.keccak256("returnData(uint256)")){
//     // Decode the log data using the contract ABI
//     console.log("before decoded log")
//     const decodedLog = web3.eth.abi.decodeLog(abi, log.data, log.topics.slice(0))
//     console.log("after decoded log")
//     // Extract the event parameters from the decoded log
//     const eventName = decodedLog.eventName;
//     const eventValue = decodedLog.eventValue;

//     // Do something with the event parameters
//     console.log(`Event name: ${eventName}`)
//     console.log(`Event value: ${eventValue}`)
//   }
// });

