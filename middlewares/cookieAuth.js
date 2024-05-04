const { verifyToken } = require('../jwt/jwt');
const { UserService } = require('../service/users');

async function getUserData(req) {
    const cookies = req.cookies;
    const userCookie = cookies.userCookie;
    const { data } = verifyToken(userCookie);
    const user = await UserService.findById(data);
    req.userData = user;
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