const express=require('express')
const app=express();
const dotenv=require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose=require('mongoose')
const Employee=require('./Models/Employee')
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt')


const uri=process.env.uri;


var Parser=bodyParser.json();

try{
    mongoose.connect(uri);
}catch(e){
    console.log(e);
}


app.post('/login',Parser,async (req,res)=>{
    const {name,password}=req.body;
    const data=await Employee.findOne({name:name})

    async function comparePassword(plaintextPassword, hash) {
        const result = await bcrypt.compare(plaintextPassword, hash);
        return result;  
    }
    if(data){
        if(await comparePassword(password,data.password)){
            res.send("successful")
        }
        else{
            res.send("wrong password")
        }
    }
    else{
        res.send("user does not exist")
    }    
})

app.post('/signup',Parser,async (req,res)=>{
    const {name,password}=req.body;

    async function hashPassword(plaintextPassword) {
        const hash = await bcrypt.hash(plaintextPassword, 10);
        return hash;
    }

    try{
        const check=await Employee.findOne({name:name});
        if(check){
            res.send("Name already exist")
        }
        else{
            const data=await new Employee({
                ...req.body,
                password:await hashPassword(req.body.password)
            });
            await data.save();
            res.send("Saved");
        }
    }catch(e){
        res.send(e)
    }
})

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("LISTENING...")
})