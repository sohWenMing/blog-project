const express = require('express');
const usersRouter = express.Router();
const { generateAndThrowError } = require('../utils/errorUtils/index');
const { generateHash } = require('../utils/auth/index');
const { UserService } = require('../service/users');

usersRouter.get('/', async(req, res, next) => {
    try {
        res.send('getting something from /api/users');
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
        const passwordHash = await generateHash(password);
        const userToSave = {
            username: username,
            name: name,
            passwordHash: passwordHash,
            notes: []
        };
        const savedUser = await UserService.save(userToSave);
        res.status(200).json(savedUser);
    }
    catch(error) {
        next(error);
    }
});

module.exports = { usersRouter };