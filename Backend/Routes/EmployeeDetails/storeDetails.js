const express = require("express");
const PersonalDetails = require("../../Models/Employee/PersonalDetails");
const CommunicationDetails = require("../../Models/Employee/CommunicationDetails");
const OtherDetails = require("../../Models/Employee/OtherDetails");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/personalDetails",
  [body("email").isEmail().withMessage("Valid Email is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      empId,
      firstName,
      middleName,
      lastName,
      email,
      relationType,
      relationName,
      gender,
      dob,
      maritalStatus,
      photograph,
      signature,
    } = req.body;

    try {
      let personalDetails = await PersonalDetails.findOne({ employeeId });

      if (personalDetails) {
        // Update existing record
        personalDetails.name = firstName + " " + middleName ? middleName + " " : "" + lastName;
        personalDetails.email = email;
        personalDetails.relationType = relationType;
        personalDetails.relationName = relationName;
        personalDetails.gender = gender;
        personalDetails.dob = dob;
        personalDetails.maritalStatus = maritalStatus;
        personalDetails.photograph = photograph;
        personalDetails.signature = signature;
      } else {
        // Create new record
        personalDetails = new PersonalDetails({
          employeeId:empId,
          name : firstName + " " + middleName ? middleName + " " : "" + lastName,
          email,
          relationType,
          relationName,
          gender,
          dob,
          maritalStatus,
          photograph,
          signature,
        });
      }

      await personalDetails.save();
      res.status(200).send({ message: "Personal details saved successfully" });
    } catch (error) {
      console.error("Error saving personal details: ", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.post(
  "/communicationDetails",
  [
    body("presentHouse").notEmpty().withMessage("Present House is required"),
    body("presentCity").notEmpty().withMessage("Present City is required"),
    body("presentCountry").notEmpty().withMessage("Present Country is required"),
    body("presentState").notEmpty().withMessage("Present State is required"),
    body("presentDistrict").notEmpty().withMessage("Present District is required"),
    body("presentPinCode").notEmpty().withMessage("Present Pin Code is required"),
    body("permanentHouse").notEmpty().withMessage("Permanent House is required"),
    body("permanentCity").notEmpty().withMessage("Permanent City is required"),
    body("permanentCountry").notEmpty().withMessage("Permanent Country is required"),
    body("permanentState").notEmpty().withMessage("Permanent State is required"),
    body("permanentDistrict").notEmpty().withMessage("Permanent District is required"),
    body("permanentPinCode").notEmpty().withMessage("Permanent Pin Code is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      empId,
      presentHouseNo,
      presentLocality,
      presentCountry,
      presentState,
      presentDistrict,
      presentPincode,
      permanentHouseNo,
      permanentLocality,
      permanentCountry,
      permanentState,
      permanentDistrict,
      permanentPincode
    } = req.body;

    try {
      let communicationDetails = await CommunicationDetails.findOne({ employeeId });

      if (communicationDetails) {
        // Update existing record
        communicationDetails.presentHouse = presentHouseNo;
        communicationDetails.presentCity = presentLocality;
        communicationDetails.presentCountry = presentCountry;
        communicationDetails.presentState = presentState;
        communicationDetails.presentDistrict = presentDistrict;
        communicationDetails.presentPinCode = presentPincode;
        communicationDetails.permanentHouse = permanentHouseNo;
        communicationDetails.permanentCity = permanentLocality;
        communicationDetails.permanentCountry = permanentCountry;
        communicationDetails.permanentState = permanentState;
        communicationDetails.permanentDistrict = permanentDistrict;
        communicationDetails.permanentPinCode = permanentPincode;
      } else {
        // Create new record
        communicationDetails = new CommunicationDetails({
          employeeId:empId,
          presentHouse: presentHouseNo,
          presentCity: presentLocality,
          presentCountry,
          presentState,
          presentDistrict,
          presentPinCode: presentPincode,
          permanentHouse: permanentHouseNo,
          permanentCity: permanentLocality,
          permanentCountry,
          permanentState,
          permanentDistrict,
          permanentPinCode: permanentPincode,
        });
      }

      await communicationDetails.save();
      res.status(200).send({ message: "Communication details saved successfully" });
    } catch (error) {
      console.error("Error saving communication details: ", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.post(
  "/otherDetails",
  [
    body("addressProof").notEmpty().withMessage("Address Proof is required"),
    body("identityProof").notEmpty().withMessage("Identity Proof is required"),
    body("offerLetter").notEmpty().withMessage("Offer Letter is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      empId,
      addressProof,
      identityProof,
      physicallyChallenged,
      exSoldier,
      pancard,
      offerLetter
    } = req.body;

    try {
      let otherDetails = await OtherDetails.findOne({ employeeId });

      if (otherDetails) {
        // Update existing record
        otherDetails.addressProof = addressProof;
        otherDetails.identityProof = identityProof;
        otherDetails.physicallyChallenged = physicallyChallenged;
        otherDetails.exSoldier = exSoldier;
        otherDetails.pancard = pancard;
        otherDetails.offerLetter = offerLetter;
      } else {
        // Create new record
        otherDetails = new OtherDetails({
          employeeId:empId,
          addressProof,
          identityProof,
          physicallyChallenged,
          exSoldier,
          pancard,
          offerLetter
        });
      }

      await otherDetails.save();
      res.status(200).send({ message: "Other details saved successfully" });
    } catch (error) {
      console.error("Error saving other details: ", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

module.exports = router;
