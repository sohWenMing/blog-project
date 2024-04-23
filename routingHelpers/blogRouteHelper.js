
const { UserService } = require('../service/users');
const { verifyToken } = require('../jwt/jwt');

async function decodeTokenAndReturnUser(token) {
    const decodedToken = verifyToken(token);
    const userId = decodedToken.data;
    const user = await UserService.findById(userId);
    return (
        {
            userId, user
        }
    );
}

module.exports = { decodeTokenAndReturnUser };