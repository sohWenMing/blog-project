const path = require( 'path' );
require('dotenv').config({
    'path': path.resolve(__dirname, '../.env')
});

const PASSWORD = process.env.PASSWORD;
const url = process.env.NODE_ENV !== 'test' ?
    `mongodb+srv://nindgabeet:${PASSWORD}@cluster0.hb7m3ac.mongodb.net/Blog?retryWrites=true&w=majority`
    : `mongodb+srv://nindgabeet:${PASSWORD}@cluster0.hb7m3ac.mongodb.net/Blog-Test?retryWrites=true&w=majority`;
const NODE_ENV = process.env.NODE_ENV;

const SECRET=process.env.SECRET;

module.exports = { url, SECRET, NODE_ENV };
