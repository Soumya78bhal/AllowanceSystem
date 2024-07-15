const express =require("express")
const router= express.Router();
const AuthRoute=require("./auth")
const ApplicationRoute=require("./application")
const ProfileRoute=require("./profile")
const EmployeeRoute=require("./EmployeeDetails/storeDetails")


router.use('/auth',AuthRoute);
router.use('/empDetails',EmployeeRoute);
router.use('/application',ApplicationRoute);
router.use('/profile',ProfileRoute);


module.exports=router;

 /*  
 Routes:
 'api/auth' : Authentication routes for employee and admin login
 'api/empDetails': Create and Update employee all details
 'api/application': CRUD operations for allowance applications
 'api/profile': Fetching and updating profile information 
 
 
 
 
 */