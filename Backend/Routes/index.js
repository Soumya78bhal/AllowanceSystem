const express =require("express")
const router= express.Router();
const AuthRoute=require("./auth")
const ApplicationRoute=require("./application")
const EmployeeRoute=require("./EmployeeDetails/storeDetails")


router.get("/",(req,res)=>{
    res.send("the is backend of api")
})

router.use('/auth',AuthRoute);
router.use('/empdetails',EmployeeRoute);
router.use('/application',ApplicationRoute);


module.exports=router;