const Leave = require('../models/LMS');

module.exports = class LeaveDAO {
    static async getLeaveData(empId) {
        try {
            const leaveData = await Leave.find({id: empId});
            return leaveData;
        } catch(err) {
            console.log(err);
        }
    }

    static async addLeave(id, leave) {
        try {
            const response = await new Leave(leave).save();
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    static async editLeave(empId, leave) {
        try {
            const updateResponse = await Leave.findOneAndUpdate({id: empId}, leave);
            return updateResponse;
        } catch(err) {
            console.log(err);
        }
    }
}