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
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);


module.exports = {
    Post
};


