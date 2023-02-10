import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export class Db{

constructor(){}

getTransactions = async()=>{
    const [result] = await pool.query(`Select * from transactions`)
    return result;
}

getTransactionbyId = async(id)=>{
    const [result] = await pool.query(`Select * from transactions where id = ?`,[id])
    return result[0];
}

getTransactionbyNonce = async(tx)=>{
    const [result] = await pool.query(`SELECT *, JSON_EXTRACT(unsigned_transaction, "$.name")
    FROM transactions
    WHERE JSON_EXTRACT(unsigned_transaction, "$.nonce") = "${tx.nonce}"`
    )
    return result[0];
}

addEntry = async(tx)=>{
    const [result] = await pool.query(
    `Insert into transactions(unsigned_transaction) Values(?)`,[tx]);
    
    return result.insertId;

}

changeStatustoSent = async(id)=>{
    const [result] = await pool.query(`Update transactions set transaction_status = 'sent' where id = ?`,[id])
    return result.info;
}

changeStatustoInProcess = async(id)=>{
    const result = await pool.query(`Update transactions set transaction_status = 'in process' where id = ?`,[id])
    return result;
}

getUnsentTransaction = async()=>{
    const [result] = await pool.query(`Select * from transactions where transaction_status = 'unsent'`);
    return result[0];
}

}

