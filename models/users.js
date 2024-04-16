const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    passwordHash: {
        type: String
    },
    notes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

userSchema.set('toJSON', {
    transform: function(queried, returned) {
        returned.id = queried._id;
        delete returned._id;
        delete returned.__v;
        delete returned.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};