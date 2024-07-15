const express = require('express');
const router = express.Router();
const PersonalDetails = require('../Models/Employee/PersonalDetails');
const CommunicationDetails = require('../Models/Employee/CommunicationDetails');

router.get('/fetchDetails/:employeeId', async (req, res) => {
    const { employeeId } = req.params;

    try {
        const personalDetails = await PersonalDetails.findOne({ employeeId }).lean();
        const communicationDetails = await CommunicationDetails.findOne({ employeeId }).lean();

        if (!personalDetails || !communicationDetails) {
            return res.status(404).json({ message: 'Employee details not found' });
        }

        res.status(200).json({
            personalDetails,
            communicationDetails
        });
    } catch (error) {
        console.error('Error fetching employee details: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post(
    "/personalDetails",
    async (req, res) => {
      const {
        employeeId,
        relationType,
        relationName,
        gender,
        dob,
        maritalStatus,
        signature,
      } = req.body;
  
      try {
        let personalDetails = await PersonalDetails.findOne({ employeeId });
  
        if (personalDetails) {
          // Update existing record
          
          personalDetails.relationType = relationType;
          personalDetails.relationName = relationName;
          personalDetails.gender = gender;
          personalDetails.dob = dob;
          personalDetails.maritalStatus = maritalStatus;
          personalDetails.signature = signature;
        } else {
          // Create new record
          personalDetails = new PersonalDetails({
            employeeId ,
            name: " ",
            email: " ",
            relationType,
            relationName,
            gender,
            dob,
            maritalStatus,
            photograph: " ",
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
    
    async (req, res) => {
  
      const {
        employeeId,
        presentHouse,
        presentCity,
        presentCountry,
        presentState,
        presentDistrict,
        presentPinCode,
        permanentHouse,
        permanentCity,
        permanentCountry,
        permanentState,
        permanentDistrict,
        permanentPinCode
      } = req.body;
  
      try {
        let communicationDetails = await CommunicationDetails.findOne({ employeeId });
  
        if (communicationDetails) {
          // Update existing record
          communicationDetails.presentHouse = presentHouse;
          communicationDetails.presentCity = presentCity;
          communicationDetails.presentCountry = presentCountry;
          communicationDetails.presentState = presentState;
          communicationDetails.presentDistrict = presentDistrict;
          communicationDetails.presentPinCode = presentPinCode;
          communicationDetails.permanentHouse = permanentHouse;
          communicationDetails.permanentCity = permanentCity;
          communicationDetails.permanentCountry = permanentCountry;
          communicationDetails.permanentState = permanentState;
          communicationDetails.permanentDistrict = permanentDistrict;
          communicationDetails.permanentPinCode = permanentPinCode;
        } else {
          // Create new record
          communicationDetails = new CommunicationDetails({
            employeeId,
            presentHouse,
            presentCity,
            presentCountry,
            presentState,
            presentDistrict,
            presentPinCode,
            permanentHouse,
            permanentCity,
            permanentCountry,
            permanentState,
            permanentDistrict,
            permanentPinCode,
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

module.exports = router;
