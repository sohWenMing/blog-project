const express = require('express');
const app = express();
const { connectToDB } = require('./models/index');
const { blogRouter, usersRouter, loginRouter } = require('./controllers/index');
const { requestLogger } = require('./utils/middlewares');
const { errorHandler } = require('./utils/errorUtils');
const { generateAndThrowError } = require('./utils/errorUtils/errorGenerator');
const { getTokenFromHeader } = require('./jwt/jwt');

app.use(express.json());
if(process.env.NODE_ENV !== 'test') {
    app.use(requestLogger);
}

connectToDB();
// ------------------------------request logger -----------------------------------------
app.use('/', getTokenFromHeader);
app.use('/api/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/login', loginRouter);
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

