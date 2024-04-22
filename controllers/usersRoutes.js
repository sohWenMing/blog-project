const express = require('express');
const usersRouter = express.Router();
const { generateAndThrowError } = require('../utils/errorUtils/index');
const { generateHash } = require('../utils/auth/index');
const { UserService } = require('../service/users');

usersRouter.get('/', async(req, res, next) => {
    try {
        const allUsers = await UserService.getAll();
        res.status(200).json(allUsers);
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
        const savedUser = await UserService.save(req.body);
        res.status(200).json(savedUser);
    }
    catch(error) {
        next(error);
    }
});

module.exports = { usersRouter };