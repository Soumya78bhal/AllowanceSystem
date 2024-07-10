const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    // Personal Details
    name: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    fatherHusbandName: {
        type: String,
        required: true
    },
    motherName: {
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
        type: String, // Assuming URL or path to the photograph file
        required: true
    },
    signature: {
        type: String, // Assuming URL or path to the signature file
        required: true
    },

    // Communication Details
    presentAddress: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Other Details
    physicallyChallenged: {
        type: Boolean,
        default: false
    },
    widow: {
        type: Boolean,
        default: false
    },
    widowCertificateNo: {
        type: String,
        required: function() { return this.widow; } // Required if widow is true
    },
    exSoldier: {
        type: Boolean,
        default: false
    },
    exSoldierIdCardNo: {
        type: String,
        required: function() { return this.exSoldier; } // Required if exSoldier is true
    },
    currentEmployer: {
        type: String,
        required: false
    },

    // System Fields
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    allowances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
