const path = require( 'path' );
require('dotenv').config({
    'path': path.resolve(__dirname, '../.env')
});

const PASSWORD = process.env.PASSWORD;
const url = `mongodb+srv://nindgabeet:${PASSWORD}@cluster0.hb7m3ac.mongodb.net/Blog?retryWrites=true&w=majority`;

module.exports = { url };
