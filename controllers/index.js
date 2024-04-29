const { blogRouter } = require('./blogRoutes');
const { loginRouter } = require('./loginRoutes');
const { usersRouter } = require('./usersRoutes');
const { cookieRouter } = require('./testCookie');


module.exports = {
    blogRouter,
    usersRouter,
    loginRouter,
    cookieRouter
};