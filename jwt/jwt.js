const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const { NODE_ENV } = require('../utils/config');
const { info } = require('../utils/logger');

function signToken(data) {
    const token = jwt.sign(
        { data: data }, SECRET, { expiresIn: '1h' }
    );
    return token;
}

function verifyToken(token) {
    if(NODE_ENV === 'test') {
        info(`verify token ran, token: ${token} `);
    }
    const decodedData = jwt.verify(token, SECRET);
    return decodedData;
}

function getTokenFromHeader(req, res, next) {
    const authorization = req.headers.authorization;
    if(NODE_ENV === 'test') {
        info(`getTokenFromHeader ran authorization: ${authorization} url: ${req.url}` );
    }
    if(authorization && authorization.includes('Bearer')) {
        let token = req.headers.authorization;
        token = token.replace('Bearer ', '');
        req.token = token;
    }
    next();
}

module.exports = {
    signToken, verifyToken, getTokenFromHeader
};