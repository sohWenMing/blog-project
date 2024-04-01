const { info, error } = require('./logger');

function requestLogger(req, res, next) {
    info('----- Request Info Start -----');
    info('TimeStamp: ', new Date().toISOString());
    info('URL: ', req.url);
    info('Method: ',req.method);
    info('Headers', req.headers);
    info('Body: ', req.body);

    // info('Request: ', req);
    info('----- Request Info End -----');
    next();
}

function errorLogger(err) {
    error('-----Error Info Start -----');
    error('TimeStamp: ', new Date().toISOString());
    error('Error Name: ', err.name);
    error('Error Stack: ', err.stack);
}

function errorHandler(err, req, res, next) {
    errorLogger(err);
    if(err.name === 'CastError') {
        return(res.status(500).json({ error: 'Malformed id' }));
    }
    if(err.name === 'BSONError') {
        return(res.status(500).json({ error: 'the id searched for was not valid' }));
    }
    next(err);
}


module.exports = { requestLogger, errorLogger, errorHandler };