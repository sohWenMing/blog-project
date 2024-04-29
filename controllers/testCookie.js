const express = require('express');
const cookieRouter = express.Router();
const { getLoginCookie } = require('../utils/auth/cookieParser');

cookieRouter.get('/', async(req, res) => {
    getLoginCookie(req);
});

module.exports = {
    cookieRouter
};