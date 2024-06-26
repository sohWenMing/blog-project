const express = require('express');
const usersRouter = express.Router();
const { generateAndThrowError } = require('../utils/errorUtils/index');
const { UserService } = require('../service/users');

usersRouter.get('/', async(req, res, next) => {
    try {
        const allUsers = await UserService.getAll();
        const usersPromisesArray = allUsers.map((user) => {
            return user.toJSON();
        });
        const users = await Promise.all(usersPromisesArray);
        res.status(200).json(users);
    }
    catch(err) {
        next(err);
    }
});

usersRouter.post('/', async(req, res, next) => {
    try {
        const { username, name, password } = req.body;
        if(!username || !name || !password) {
            generateAndThrowError('MandatoryInfoNotFilledError', 'Mandatory information not filled');
        }
        if(password.length < 5) {
            generateAndThrowError('ValidationError', 'Password has to be at least 5 characters');
        }
        const savedUser = await UserService.save(req.body);
        const savedUserJson = await savedUser.toJSON();
        res.status(200).json(savedUserJson);
    }
    catch(error) {
        next(error);
    }
});

module.exports = { usersRouter };