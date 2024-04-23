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
    transform: async function(document, returned) {
        returned.id = document._id.toString();
        delete returned._id;
        delete returned.__v;
        delete returned.passwordHash;
        await document.populate('posts')
        const postArray = document.posts.map((post) => {
            return (
                {
                    id: post._id.toString(),
                    title: post.title,
                    url: post.url,
                    likes: post.likes,
                    author: post.author
                }
            );
        });
        returned.posts = postArray;

        return returned;

    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};