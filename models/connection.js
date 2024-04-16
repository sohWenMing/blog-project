const { url } = require('../utils/config');
const mongoose = require('mongoose');
const { info, error } = require('../utils/logger');

mongoose.set('strictQuery', false);

async function connectToDB() {
    try {
        console.log('url', url);
        await mongoose.connect(url);
        info('Connected to MongoDB');
    }
    catch(err) {
        error('error connecting to MongoDB', err);
        process.exit(1);
    }
}

async function disconnectFromDB() {
    try {
        await mongoose.connection.close();
        info('disconnected from MongoDB');
    }
    catch(err) {
        error('error disconnecting from MongoDB', err);
        process.exit(1);
    }
}

module.exports = { connectToDB, mongoose, disconnectFromDB };

