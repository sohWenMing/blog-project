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

module.exports = { requestLogger, errorLogger };