const express = require('express');
const app = express();
const { connectToDB } = require('./models/index');
const { blogRouter, usersRouter } = require('./controllers/index');

const { requestLogger } = require('./utils/middlewares');
const { errorHandler } = require('./utils/errorUtils');

app.use(express.json());
if(process.env.NODE_ENV !== 'test') {
    app.use(requestLogger);
}

connectToDB();
// ------------------------------request logger -----------------------------------------

app.use('/api/users', usersRouter);
app.use('/api/blog', blogRouter);

// ------------------------------error handler-----------------------------------------


app.use(errorHandler);
module.exports = {
    app
};

