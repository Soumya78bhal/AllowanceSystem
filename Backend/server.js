const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const { connect } = require("./db")
const router = require("./Routes");
const cors = require("cors");


connect(); // Connect to MongoDB


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api",router);

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`LISTENING on ${PORT}...`)
})