const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateAndThrowError } = require('../errorUtils/errorGenerator');

async function generateHash(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

async function checkPassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    if(!match) {
        generateAndThrowError('WrongPasswordError', 'Username and password do not match');
    }
    return;
}

module.exports = {
    generateHash, checkPassword
};