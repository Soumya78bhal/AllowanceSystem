const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Employee = require("../Models/Employee/Employee");
const { body, validationResult } = require('express-validator');

router.get("/", (req,res) => {
  res.send("Hello from auth backend!");
})


router.post("/login", async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { loginRole, username, password } = req.body;

    try {
      const user = await Employee.findOne({ username });
      if (!user) {
        return res.status(404).send({ message: "User does not exist" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Wrong password" });
      } 
      console.log(`loginRole: ${loginRole}, user.isAdmin: ${user.isAdmin}`);
      if (loginRole === "admin" && !user.isAdmin) {
        return res.status(401).send({ message: "You are not an admin!" });
      }
      res.status(200).send({ message: "Successful login", user });
    } catch (error) {
      console.error("Error during login: ", error);
      res.status(500).send({ message: "Internal server error" });
    }
  } else {
    res.send(errors);
  }
});

router.post("/register", [
  body('password').isLength({min:8}).withMessage('Minimum length is 8 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { employeeId, username, password } = req.body;

  try {
    const existingUser = await Employee.findOne({ employeeId });
    if (existingUser) {
      return res.status(409).send({ message: "Employee ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      employeeId,
      username,
      password: hashedPassword,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).send({ message: "Account initiated successfully", empId: savedEmployee._id });
  } catch (error) {
    console.error("Error during signup: ", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
