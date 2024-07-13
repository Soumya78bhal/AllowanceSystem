const mongoose = require('mongoose');
const otherDetailsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    addressProof: {
        type: String,
        required: true
    },
    identityProof: {
        type: String,
        required: true
    },
    physicallyChallenged: {
        type: String,
        default: null
    },
    
    exSoldier: {
        type: String,
        default: null
    },

    pancard: {
        type: String,
        required: true
    },
    
    offerLetter: {
        type: String,
        required: true
    }
});

const OtherDetails = mongoose.model('OtherDetails', otherDetailsSchema);
module.exports = OtherDetails;
