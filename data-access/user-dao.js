const User = require('../models/User');

module.exports = class EmployeeDAO{
    static async getAllUsers() {
        try {
            const allEmployees = await User.find();
            console.log(allEmployees);
            return allEmployees;
        } catch (error) {
            console.log(`Could not fetch Employees ${error}`);
        }
    }

    static async getUser(empId) {
        try {
            const singleEmployee = await User.findOne({id: empId});
            return singleEmployee;
        } catch (error) {
            console.log(`Could not fetch Employees ${error}`);
        }
    }

    static async createUser(user) {
        try {
            const response = await new User(user).save();
            return response;
        } catch (error) {
            console.log(`Could not create employee ${error}`);
        }
    }

    static async updateUser(empId, employee) {
        try {
            const updateResponse = await User.findOneAndUpdate({ id: empId }, employee);
            console.log(employee);
            return updateResponse;
        } catch (error) {
            console.log(`Could not update employee ${error}`);
        }
    }

    static async deleteUser(empId) {
        try {
            const deletedResponse = await User.findOneAndDelete({ id: empId });
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete employee ${error}`);
        }
    }
}