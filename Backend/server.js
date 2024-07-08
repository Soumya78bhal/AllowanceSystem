const express=require('express')
const app=express();
const dotenv=require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose=require('mongoose')
const Employee=require('./Models/Employee')

const uri=process.env.uri;

///Testing connection

// async function connection(){
//     try{
//         await client.connect();
//         await client.db("admin").command({ping:1});
//         console.log("successful");
//     }catch(err){
//         console.log(err);
//     }
//     finally{
//         await client.close();
//     }
// }
// connection();

mongoose.connect(uri);


const data=new Employee({
    name:"hariany",
    password:"1234567"
})
async function savedata(){ 
    await data.save();
}
//savedata();
const client=new MongoClient(uri);


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("LISTENING...")
})