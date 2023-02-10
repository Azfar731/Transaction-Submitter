import {app} from './scripts/server.js'
import cron from 'node-cron'
import {Db} from './scripts/database.js'
import {Web} from './scripts/trans_submitter.js'


const db = new Db();
const web = new Web();


cron.schedule('*/20 * * * * *', async ()=>{
    const entry = await db.getUnsentTransaction();
    if(entry){
        const id = entry.id;
        const tx = entry.unsigned_transaction;
        var result = await db.changeStatustoInProcess(id);
        const status = await web.sendTransaction(tx);
        if(status){
        result = await db.changeStatustoSent(id);
        }
    }
    else{
        console.log("No unsent Transaction in database");
    }

})



