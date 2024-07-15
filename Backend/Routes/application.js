const express = require('express');
const Application = require('../Models/Application'); // Adjust the path as necessary
const Employee = require('../Models/Employee/Employee'); // Ensure Employee model is also imported
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadsDir = path.resolve(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

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
        const allowances= await Application.find({employee:id});
        res.status(200).send(allowances)
    }catch(e){
        console.error("Error retrieving application: ", e);
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
router.post('/postApplication', upload.single('file'), async (req, res) => {
    try {
        const { body, file } = req;
        if (!file) {
            console.log('File not uploaded');
            return res.status(400).send({ message: "File not uploaded" });
        }
        if (body.selectedAllowanceTypes) {
            body.selectedAllowanceTypes = JSON.parse(body.selectedAllowanceTypes);
        }
        const data = new Application({
            ...body,
            file: file.filename, // Save the file path to the database
        });
        await data.save();
        res.status(200).send({ message: "Saved Successfully" });
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Error");
    }
});

//update status of a application

router.post('/updateApplication',async (req,res)=>{
    const id=req.body._id;
        try{
            await Application.findOneAndUpdate({_id:id},
                {
                    status:req.body.status,
                    remark:req.body.remark
                }
            )

            res.send(true)
        }catch(e){
            res.send(e)
        }
})


router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename); // Adjust the path accordingly

    res.download(filePath, filename, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error downloading file");
        }
    });
});
module.exports = router;