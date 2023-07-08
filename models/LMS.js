var mongoose = require('mongoose');


var leaveSchema = new mongoose.Schema({
    id: {
        type: String,
    },

    totalLeave: {
        type: Number,
        default: 36
    },

    leavesTaken: {
        type: Number,
        required: true
    },

    leaveStart: {
        type: String,
        required: true
    },

    leaveEnd: {
        type: String,
        required: true
    },

    leaveReason: {
        type: String,
        required: true
    },
    
    approval: {
        type: String,
        default: 'Pending'
    }
});

module.exports = Leave = mongoose.model('Leave', leaveSchema);