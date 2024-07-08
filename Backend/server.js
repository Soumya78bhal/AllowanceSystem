const express=require('express')
const app=express();
const dotenv=require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose=require('mongoose')
const Employee=require('./Models/Employee')
const bodyParser=require('body-parser');

const uri=process.env.uri;


var Parser=bodyParser.json();

try{
    mongoose.connect(uri);
}catch(e){
    console.log(e);
}


app.post('/signup',Parser,async (req,res)=>{
    const {name,password}=req.body;

    try{
        const check=await Employee.findOne({name:name});
        if(check){
            res.send("Name already exist")
        }
        else{
            const data=await new Employee(req.body);
            await data.save();
            res.send("Saved");
        }
    }catch(e){
        res.send("error")
    }
})

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("LISTENING...")
})