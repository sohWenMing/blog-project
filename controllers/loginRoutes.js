const express = require('express');
const loginRouter = express.Router();
const { UserService } = require('../service/users');
const { generateAndThrowError } = require('../utils/errorUtils/errorGenerator');
const { checkPassword } = require('../bcrypt/bcryptUtils');
const { signToken } = require('../jwt/jwt');

loginRouter.get('/', (req, res) => {
    res.send('getting something from login route');
});

loginRouter.post('/', async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const foundUser = await UserService.findByUserName(username);
        if(!foundUser) {
            generateAndThrowError('UserNotFoundError', `User with username ${username} was not found.`);
        }
        await checkPassword(password, foundUser.passwordHash);
        const token = signToken(foundUser._id.toString());
        res.cookie('userCookie', token);
        res.status(200).json({
            token: token,
            userId: foundUser._id.toString(),
            username: foundUser.username
        });
        // res.redirect('http://localhost:5173/home');
    }
    catch(error) {
        next(error);
    }
});

loginRouter.get('/logout', (req, res) => {
    res.clearCookie('userCookie');
    const jsonMessage = {
        message: 'cookie cleared'
    };
    res.status(200).json(jsonMessage);
});

module.exports = { loginRouter };