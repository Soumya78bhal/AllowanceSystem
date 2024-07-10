const { validationResult } = require("express-validator");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Employee = require("../Models/Employee");
const bodyParser = require("body-parser");
const signupValidator = require("../Validators/signupValidator");
const loginValidator = require("../Validators/loginValidator");


router.post("/login", loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
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
  } else {
    res.send(errors);
  }
});

router.post("/register", signupValidator, async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, password } = req.body;

    try {
      const existingUser = await Employee.findOne({ name: name });
      if (existingUser) {
        return res.status(409).send({ message: "Name already exists" });
      }
      let hashedPassword = "";
      bcrypt.hash(password, 10, async (err, hash) => {
        const newUser = new Employee({
          ...req.body,
          password: hash,
        });
        await newUser.save();
      });

      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.error("Error during signup: ", error);
      res.status(500).send({ message: "Internal server error" });
    }
  } else {
    res.send(errors);
  }
});

module.exports = router;
