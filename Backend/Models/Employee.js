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
    
    allowances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
