const { verifyToken } = require('../jwt/jwt');
const { UserService } = require('../service/users');

async function getCookieAndVerifyUser(req, res, next) {

    try {
        const cookies = req.cookies;
        const userCookie = cookies.userCookie;
        const { data } = verifyToken(userCookie);
        const user = await UserService.findById(data);
        console.log(user);
        next();
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    getCookieAndVerifyUser
};