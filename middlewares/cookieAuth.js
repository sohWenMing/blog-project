const { verifyToken } = require('../jwt/jwt');
const { UserService } = require('../service/users');
const { generateAndThrowError } = require('../utils/errorUtils/errorGenerator');

async function getUserData(req) {
    const url = req.url;
    const params = url.split('?');
    let tokenString = params.find((param) => {
        return param.startsWith('token=');
    });
    if(!tokenString) {
        generateAndThrowError('JsonWebTokenError', 'Token not found in request');
    }
    const token = tokenString.replace('token=', '');
    verifyToken(token);
    // const user = await UserService.findById(data);
    // req.userData = user;
}

async function getCookieAndVerifyUser(req, res, next) {

    try {
        await getUserData(req);
        next();
    }
    catch(error) {
        next(error);
    }
}


module.exports = {
    getCookieAndVerifyUser,
};