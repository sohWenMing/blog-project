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
    if(err.name === 'ValidationError') {
        if(err.message.includes('username')) {
            return res.status(400).json({ error: 'username has to be minimum 5 characters' });
        }
        if(err.message.includes('Password')) {
            return res.status(400).json({ error: err.message });
        }
    }
    if(err.name === 'PageNotFoundError') {
        return res.status(400).json({ error: err.message });
    }
    if(err.name === 'UserNotFoundError') {
        return res.status(400).json({ error: err.message });
    }
    if(err.name === 'WrongPasswordError') {
        return res.status(400).json({ error: err.message });
    }
    if(err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')  {
        return res.status(401).json( { error: 'There was a problem with the request' } );
    }
    if(err.name === 'BlogpostNotFoundError') {
        return res.status(400).json({ error: err.message });
    }
    if(err.name === 'AuthorizationError') {
        return res.status(401).json({ error: 'There was a problem with the request' });
    }
    return res.status(400).json({
        error: 'There was a problem with the request'
    });
}

module.exports = { errorHandler };