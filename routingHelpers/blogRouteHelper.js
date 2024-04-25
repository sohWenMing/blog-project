
const { UserService } = require('../service/users');
const { verifyToken } = require('../jwt/jwt');
const { generateAndThrowError } = require('../utils/errorUtils/errorGenerator');

async function decodeTokenAndReturnUser(token) {
    const decodedToken = verifyToken(token);
    const userId = decodedToken.data;
    const user = await UserService.findById(userId);
    if(!user) {
        generateAndThrowError('UserNotFoundError', 'There was a problem with the request');
    }
    return (
        {
            userId, user
        }
    );
}

module.exports = { decodeTokenAndReturnUser };