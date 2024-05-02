const express = require('express');
const app = express();
const { connectToDB } = require('./models/index');
const { blogRouter, usersRouter, loginRouter, cookieRouter } = require('./controllers/index');
const { requestLogger } = require('./utils/middlewares');
const { errorHandler } = require('./utils/errorUtils');
const { generateAndThrowError } = require('./utils/errorUtils/errorGenerator');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const { getCookieAndVerifyUser } = require('./middlewares/cookieAuth');
app.use(cookieParser());
app.use(express.json());
if(process.env.NODE_ENV !== 'test') {
    app.use(requestLogger);
}

connectToDB();
// ------------------------------request logger -----------------------------------------
// app.use('/', getTokenFromHeader);
app.use('/login', loginRouter);
app.use('/', getCookieAndVerifyUser);
app.use('/api/users', usersRouter);
app.use('/api/blog', blogRouter);

app.use('/testCookie', cookieRouter);
app.use('/', (req, res) => {
    res.json({ message: 'this is the placeholder for the front end' });
});
app.all('*', async(req, res, next) => {
    try {
        generateAndThrowError('PageNotFoundError', 'The url could not be found');
    }
    catch(error) {
        next(error);
    }
});

// ------------------------------error handler-----------------------------------------


app.use(errorHandler);
module.exports = {
    app
};

