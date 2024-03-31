const express = require('express');
const app = express();
const { connectToDB } = require('./models/index');
const { blogRouter } = require('./controllers/index');

app.use(express.json());

console.log(connectToDB);
connectToDB();

app.use('/api/blog', blogRouter);
module.exports = {
    app
};