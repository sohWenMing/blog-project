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
}

module.exports = {
    UserService: new UserService
};