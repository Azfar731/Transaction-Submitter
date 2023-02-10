Start the Project:
1.Start the project by typing "node app.js" in terminal


Directories:
1.Static: Contains the .js files being served at front end
2.Views: Contains html/ejs files
3.routes: Contains the routes.js file, which contains all routes information
4.Scripts: Contains the all .js modules

Scripts:
database.js: Contains a class Db, that deals with databse functions.
trans_submitter: Contains a class Web, that contains all function responsible for communicating with smart contract 
server.js: Contains configurations of express server

Implemented Checks:
1.Check the user balance before sending transaction.
2.Calculate nonce by adding mined transactions plus pending transactions. Also maintains a Local Nonce value to keep track of transactions in the database.
3.Check the input value coming from front-end. Only Integer values are accepted. 


NPM Modules being used:
1-Express.js
2-Web3.js
3-node-cron: to implement cron job
4-mysql2: to connect to Mysql database
5-dotenv: to use .env file

Database:
MySql databse used.

Database structure:
One table: "Transactions". 
Three columns:
1- "Id", type:Integer 
2- "unsigned_transaction" , type:JSON
3- "transaction_status", type:Enum('unsent','sent','in process')

Smart Contract structure:
Contains One state variable:
1-Data ,type (uint256) 
Contains Two functions:
1-updateData
2-readData()
