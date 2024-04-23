const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    passwordHash: {
        type: String
    },
    posts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

userSchema.set('toJSON', {
    transform: async function(queried, returned) {
        returned.id = queried._id.toString();
        delete returned._id;
        delete returned.__v;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};