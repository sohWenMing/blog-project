function getLoginCookie(req) {
    const cookies = req.cookies;
    const userCookie = cookies.userCookie;
    console.log('userCookie', userCookie);
    return userCookie;
}

module.exports = {
    getLoginCookie
};