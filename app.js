const express = require('express');
const app = express();
const { connectToDB } = require('./models/index');
const { blogRouter } = require('./controllers/index');
const { requestLogger, errorLogger, errorHandler } = require('./utils/middlewares');

app.use(express.json());
app.use(requestLogger);

connectToDB();
// ------------------------------request logger -----------------------------------------


app.use('/api/blog', blogRouter);

// ------------------------------error handler-----------------------------------------

// app.use(errorLogger);
app.use(errorHandler);
module.exports = {
    app
};

