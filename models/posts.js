const { mongoose } = require('./connection');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

postSchema.set('toJSON', {
    'transform' : async(document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject.__v;
        delete returnedObject._id;

        await document.populate('user', { username: 1, name: 1 });

        const userData = {
            id: document.user._id.toString(),
            username: document.user.username,
            name: document.user.name,
        }

        returnedObject.user = userData;
        return returnedObject;
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = {
    Post
};


