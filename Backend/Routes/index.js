const express =require("express")
const router= express.Router();
const AuthRoute=require("./auth")


router.get("/",(req,res)=>{
    res.send("the is backend of api")
})

router.use('/auth',AuthRoute);


module.exports=router;