# Transaction-Submitter

## Project Description

This project demonstrates a robust architecture for handling blockchain transactions by incorporating an intermediary database layer to manage transaction states before interacting with the blockchain. It simulates a real-world scenario where transactions are queued, monitored, and dispatched at regular intervals, ensuring reliability and traceability.

## Key Features

### Transaction State Management

All blockchain transactions are stored in a database with lifecycle states (`unsent`, `inProcess`, `sent`). This enables tracking, error handling, and retry mechanisms for pending transactions before they are committed to the blockchain.

### Scheduled Transaction Dispatch

The system periodically scans the database for pending transactions and pushes them to the blockchain in batches or at predefined intervals, reducing network congestion and improving reliability.

### Security Checks

1. Balance verification before transaction submission
2. Nonce calculation (mined + pending transactions)
   - Maintains local nonce value for database transaction tracking
3. Frontend input validation (integers only)

## Project Components

### 1. Smart Contract

A simple Solidity smart contract that contains a single state variable. It provides functions to:

- **Read** the current value of the state variable.
- **Update** the value of the state variable via external transactions.

### 2. Web Application

#### ➤ Frontend

A user-friendly interface that allows users to:

- View the current value of the smart contract's state variable.
- Input a new value to update the state variable (sent to the backend for processing).

#### ➤ Backend

The backend serves as middleware between the frontend, the database, and the blockchain network. Its responsibilities include:

- Establishing a connection with the smart contract using Web3 or equivalent blockchain APIs.
- Handling read operations by querying the smart contract directly to fetch the current state.
- Handling write operations by:
  - Creating a blockchain transaction payload with the new value.
  - Storing this transaction in the database with a status of `unsent`.
  - Periodically processing queued transactions, changing their status to `inProcess` during submission and `sent` upon successful confirmation on the blockchain.

## Getting Started

Follow these steps to launch the web application and run a local instance of the blockchain using Truffle:

### 1. Start the Local Blockchain (Ganache/Truffle Develop)

You can use Ganache GUI or Truffle's built-in development blockchain. To use Truffle's built-in blockchain:

```bash
cd "smart contract"
truffle develop
```

Or, if you have Ganache installed, simply launch Ganache and ensure it is running on `localhost:7545`.

### 2. Compile and Deploy the Smart Contract

In a new terminal, navigate to the `smart contract` directory and run:

```bash
truffle migrate --network development
```

This will compile and deploy the smart contract to your local blockchain instance.

### 3. Install Dependencies for the Web Application

Navigate to the `transaction submitter` directory and install the required npm packages:

```bash
cd "transaction submitter"
npm install
```

### 3.5. Create the Environment Configuration

Copy the example environment file and update it with your local settings:

```bash
cp .env.example .env
```

Edit the `.env` file to match your database credentials and other configuration values as needed.

### 4. Launch the Web Application

Start the Express.js server:

```bash
node app.js
```

The web application should now be running. Open your browser and go to `http://localhost:3000` (or the port specified in your configuration) to access the frontend.

---

**Note:**

- Ensure your MySQL database is running and configured as expected.
- Update any environment variables in a `.env` file if required (see project documentation for details).

## Project Structure

### Directories

- **Static**: Contains the frontend JavaScript files
- **Views**: Contains HTML/EJS template files
- **Routes**: Contains `routes.js` with all routing information
- **Scripts**: Contains all JavaScript modules

### Scripts

- **database.js**: Class `Db` that handles database operations
- **trans_submitter.js**: Class `Web` that handles smart contract communications
- **server.js**: Express server configurations

### Dependencies

- [Express.js](https://expressjs.com/) - Web framework
- [Web3.js](https://web3js.readthedocs.io/) - Ethereum interaction
- [node-cron](https://www.npmjs.com/package/node-cron) - Task scheduling
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL database connection
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment configuration

## Database

### MySQL Configuration

Table: `Transactions`

#### Schema

| Column               | Type    | Description                            |
| -------------------- | ------- | -------------------------------------- |
| Id                   | Integer | Primary Key                            |
| unsigned_transaction | JSON    | Transaction data                       |
| transaction_status   | Enum    | Status: 'unsent', 'sent', 'in process' |

## Smart Contract

### Structure

#### State Variables

- `Data` (uint256)

#### Functions

- `updateData()`
- `readData()`
