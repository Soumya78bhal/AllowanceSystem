const express = require('express');
const Application = require('../Models/Application'); // Adjust the path as necessary
const Employee = require('../Models/Employee/Employee'); // Ensure Employee model is also imported
const router = express.Router();
const {ObjectId}=require('mongodb')

// POST /applications - Create a new application
router.post('/register', async (req, res) => {
    const { employee, allowanceType, startDate, endDate, status, bill } = req.body;

    try {
        // Ensure the employee exists
        const employeeExists = await Employee.findById(employee);
        if (!employeeExists) {
            return res.status(404).send({ message: "Employee does not exist" });
        }

        const newApplication = new Application({
            employee,
            allowanceType,
            startDate,
            endDate,
            status,
            bill
        });

        const savedApplication = await newApplication.save();

        // Add the application to the employee's allowances array
        employeeExists.allowances.push(savedApplication._id);
        await employeeExists.save();

        res.status(201).send({ message: "Application submitted successfully", application: newApplication });

    } catch (error) {
        console.error("Error creating application: ", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// GET /applications - Retrieve all applications
router.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find({status:"Pending"}).populate('employee');
        res.status(200).send(applications);
    } catch (error) {
        console.error("Error retrieving applications: ", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// GET /applications/:id - Retrieve a single application by ID
router.get('/applications/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findById(id).populate('employee');
        if (!application) {
            return res.status(404).send({ message: "Application not found" });
        }
        res.status(200).send(application);
    } catch (error) {
        console.error("Error retrieving application: ", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

//GET /applications/user/:id - Retrieve applications of a user

router.get('/userApplications/:id',async(req,res)=>{
    const {id}=req.params;

    try{
        const data= await Application.find({employee:id});
        if(!data){
            return res.status(404).send({message:"Application not found"});
        }
        res.status(200).send(data)
    }catch(e){
        console.error("Error retrieving application: ", error);
        res.status(500).send({ message: "Internal server error" });
    }
})

//Get data of a user
router.get('/userData/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const data= await Employee.findOne({_id:id});
        if(!data){
            return res.status(404).send({message:"Application not found"});
        }
        res.status(200).send(data)
    }catch(e){
        console.error("Error retrieving application: ", e);
        res.status(500).send({ message: "Internal server error" });
    }
})

//Save Applications
router.post('/postApplication',async (req,res)=>{
    console.log(req.body);

    const data=new Application({
        ...req.body
    });
    await data.save();
})
module.exports = router;