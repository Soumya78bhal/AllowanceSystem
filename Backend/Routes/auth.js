const express=require("express");
const bcrypt=require('bcrypt')
const router=express.Router();
const Employee=require('../Models/Employee')


router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await Employee.findOne({ name: name });
        if (!user) {
            return res.status(404).send({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Wrong password" });
        }
        res.status(200).send({ message: "Successful login" });
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post('/register', async (req, res) => {
    const { name, password } = req.body;

    try {
        const existingUser = await Employee.findOne({ name: name });
        if (existingUser) {
            return res.status(409).send({ message: "Name already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Employee({
            ...req.body,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send({ message: "User created successfully" });

    } catch (error) {
        console.error("Error during signup: ", error);
        res.status(500).send({ message: "Internal server error" });
    }
});


module.exports=router