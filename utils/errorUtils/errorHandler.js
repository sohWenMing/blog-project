const { errorLogger } = require('../middlewares');


function errorHandler(err, req, res, next) {
    errorLogger(err);
    if(err.name === 'CastError') {
        return(res.status(500).json({ error: 'Malformed id' }));
    }
    if(err.name === 'BSONError') {
        return(res.status(500).json({ error: 'the id searched for was not valid' }));
    }
    if(err.name === 'MandatoryInfoNotFilledError') {
        return res.status(400).json({ error: err.message });
    }
    if(err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key')){
        return res.status(400).json({ error: 'That username is not available' });
    }
}

module.exports = { errorHandler };