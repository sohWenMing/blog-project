const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

function signToken(data) {
    const token = jwt.sign(
        { data: data }, SECRET, { expiresIn: '1h' }
    );
    return token;
}

function verifyToken(token) {
    const decodedData = jwt.verify(token, SECRET);
    return decodedData;
}
module.exports = {
    signToken, verifyToken
};