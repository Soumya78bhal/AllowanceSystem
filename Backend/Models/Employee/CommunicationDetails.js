const mongoose = require('mongoose');
const communicationDetailsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    presentHouse: {
        type: String,
        required: true
    },
    presentCity: {
        type: String,
        required: true
    },
    presentCountry: {
        type: String,
        required: true
    },
    presentState: {
        type: String,
        required: true
    },
    presentDistrict: {
        type: String,
        required: true
    },
    presentPinCode: {
        type: String,
        required: true
    },
    permanentHouse: {
        type: String,
        required: true
    },
    permanentCity: {
        type: String,
        required: true
    },
    permanentCountry: {
        type: String,
        required: true
    },
    permanentState: {
        type: String,
        required: true
    },
    permanentDistrict: {
        type: String,
        required: true
    },
    permanentPinCode: {
        type: String,
        required: true
    },
});

const CommunicationDetails = mongoose.model('CommunicationDetails', communicationDetailsSchema);
module.exports = CommunicationDetails;
