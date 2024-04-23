const { User } = require('../models/users');
const { generateHash } = require('../utils/auth/bcryptUtils');
const mongoose = require('mongoose');

class UserService {
    async save(user) {
        const { username, name, password } = user;
        const passwordHash = await generateHash(password);

        const userToSave = new User({
            username: username,
            name: name,
            passwordHash: passwordHash,
            posts: []
        });

        const savedUser = await userToSave.save();
        return savedUser;
    }
    async update(user) {
        const updatedUser = await user.save();
        return updatedUser;
    }

    async deleteAll() {
        await User.deleteMany({});
    }

    async getAll() {
        const allUsers = await User.find({});
        return allUsers;
    }

    async findById(id) {
        const userToUpdate = await User.findById(id);
        return userToUpdate;
    }

    async findByUserName(username) {
        const foundUser = await User.findOne({ username: username });
        return foundUser;
    }
}

module.exports = {
    UserService: new UserService
};