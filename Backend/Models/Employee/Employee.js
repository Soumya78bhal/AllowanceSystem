const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    allowances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
