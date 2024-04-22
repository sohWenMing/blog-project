const { User } = require('../models/users');

class UserService {
    async save(user) {
        const userToSave = new User(user);
        const savedUser = await userToSave.save();
        return savedUser;
    }
    async deleteAll() {
        await User.deleteMany({});
    }

    async getAll() {
        const allUsers = await User.find({});
        return allUsers;
    }
}

module.exports = {
    UserService: new UserService
};