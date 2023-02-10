import express from 'express';
import {Web} from '../scripts/trans_submitter.js'
import {Db} from '../scripts/database.js'
const web = new Web();
const db = new Db()

export const router = express.Router();

router.get('/',async(req,res)=>{
    var result = await web.getValue(); 
    res.render('homePage',{quote: result})
})

router.get('/data',async (req,res)=>{

    var result = await web.getValue();
    res.send({response: result});
})


router.post('/',async(req,res)=>{
    var data = req.body;
    
    var intData = +(data.newval);
    if(isNaN(intData)|| !Number.isInteger(intData)){
    console.log("an errror occurred .....");
    res.status(400).send({response: "Enter only Integer values"});
    }
    else{
    console.log("value: ",intData)
    var tx = await web.createTransaction(0,intData)
    tx = JSON.stringify(tx) 
    var id = await db.addEntry(tx)
    res.status(200).send({response: "Value submitted"});
    }
    
   
    
})


