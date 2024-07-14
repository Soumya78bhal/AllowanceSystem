const mongoose = require('mongoose');
const Employee = require('./Employee');
const personalDetailsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    relationType: {
        type: String,
        required: true
    },
    relationName: {
        type: String,
        required: true
    },
    
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    maritalStatus: {
        type: String,
        enum: ['Married', 'Unmarried'],
        required: true
    },
    photograph: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
});

const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);
module.exports = PersonalDetails;
