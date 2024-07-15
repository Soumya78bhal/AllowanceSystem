const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    employeeName: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
  allowanceType: {
    type: String,
    default: '' 
  },
  customAllowanceType: {
    type: String,
    default: ''
  },
  selectedAllowanceTypes: [{
    type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  status:{
    type:String,
    enum:["Accepted","Rejected","Pending"],
    default:"Pending"
  },
  date: {
    type: Date,
    required: true
  },
  remark:{
    type:String
  },
  file: {
    type: String 
  }
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
