const { generateAndThrowError } = require('../utils/errorUtils/errorGenerator');

function validateUserIdAgainstEntry(idfromAuth, idFromEntry, extraData='') {
    if(idfromAuth !== idFromEntry) {
        generateAndThrowError('AuthorizationError', 'The user does not have access to the resource. ' + extraData);
    }
}

module.exports = {
    validateUserIdAgainstEntry
};

