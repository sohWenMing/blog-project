const { mongoose } = require('./connection');
function convertStringToMongooseId(string) {
    return new mongoose.Types.ObjectId(string);
}
module.exports = { convertStringToMongooseId };
