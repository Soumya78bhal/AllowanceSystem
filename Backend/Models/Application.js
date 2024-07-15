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
    default: '' // Provide a default value if needed
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
  file: {
    type: String // Assuming you store file paths or URLs
  }
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
