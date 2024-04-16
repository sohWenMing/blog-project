const { mongoose } = require('./connection');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
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
    }
});

postSchema.set('toJSON', {
    'transform' : (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject.__v;
        delete returnedObject._id;
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = {
    Post
};


