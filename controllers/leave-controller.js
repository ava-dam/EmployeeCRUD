var mongoose = require('mongoose');
var Leave = mongoose.model('Leave');
const DAO = require('../data-access/leave-dao');

module.exports.addLeave = async function(req, res) {
    var leave = {
        id: req.body.id,
        totalLeave: req.body.totalLeave,
        leavesTaken: req.body.leavesTaken,
        leaveStart: req.body.leaveStart,
        leaveEnd: req.body.leaveEnd,
        leaveReason: req.body.leaveReason,
        approval: req.body.approval
    }
    try {
        var result = await DAO.addLeave(leave.id, leave);
        res.status(201).json({data: result, message: "Added Leave for approval"});
    } catch(err) {
        res.status(500).json({data: null, message: "Error in Creating Leave, apply in some time!"});
    }
}

module.exports.getLeaveData = async function(req, res) {
    var id = req.params.id;
    DAO.getLeaveData(id).then(result => {
        res.status(200).json({data: result, message: "Success in getting leave data"});
    }, err => {
        res.status(500).json({data: [], message: "Error in getting leave data"});
    });
}

module.exports.editLeave = async function(req, res) {
    var id = req.params.id;
    var leave = {
        id: req.params.id,
        leaveStart: req.body.leaveStart,
        leaveEnd: req.body.leaveEnd,
        leaveReason: req.body.leaveReason,
        approval: req.body.approval
    }
    DAO.editLeave(id, leave).then(result => {
        res.status(200).json({data: result, message: "Successfully edited leave"});
    }, err => {
        res.status(500).json({data: null, message: "Error in updating leave data"});
    })
}

module.exports.getAll = async function(req, res) {
    console.log('works');
}