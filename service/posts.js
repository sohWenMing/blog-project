const { Post } = require('../models/index');
const { UserService } = require('./users');

class PostService {
    async deleteAll() {
        await Post.deleteMany({});
    }
    async getAll() {
        const allPosts = await Post.find({});
        return allPosts;
    }
    async save(post) {
        const postUser = await UserService.findById(post.userId);
        const postToSave = new Post({
            title: post.title,
            url: post.url,
            likes: post.likes,
            author: post.author,
            user: postUser._id
        });
        const savedPost = await postToSave.save();
        postUser.posts = postUser.posts.concat(savedPost._id);
        await UserService.update(postUser);
        return savedPost;
    }
}

module.exports = new PostService;