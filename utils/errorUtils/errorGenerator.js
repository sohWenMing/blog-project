function generateAndThrowError(name, message) {
    const error = new Error(message);
    error.name = name;
    throw error;
}

module.exports = {
    generateAndThrowError
};