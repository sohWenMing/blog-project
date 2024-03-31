const { connectToDB, mongoose } = require('./connection');
const { Post } = require('./posts');



module.exports = {
    connectToDB, Post, mongoose
};