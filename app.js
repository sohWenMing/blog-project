const express = require('express');
const app = express();
const { connectToDB } = require('./models/index');
const { blogRouter } = require('./controllers/index');
const { requestLogger, errorLogger, errorHandler } = require('./utils/middlewares');

app.use(express.json());

if(process.env.NODE_ENV !== 'test') {
    app.use(requestLogger);
}


connectToDB();
// ------------------------------request logger -----------------------------------------


app.use('/api/blog', blogRouter);
app.get('/', (req, res) => {
    res.status(200).send('getting something from base route');
});

// ------------------------------error handler-----------------------------------------

// app.use(errorLogger);
if(process.env.NODE_ENV !== 'test') {
    app.use(errorHandler);
};
module.exports = {
    app
};

