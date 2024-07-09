const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    allowanceType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    bill: {
        type: String, // URL or path to the uploaded bill PDF/DOC
        required: true
    }
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
