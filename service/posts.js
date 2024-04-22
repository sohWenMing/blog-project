const { Post } = require('../models/index');

class PostService {
    async deleteAll() {
        await Post.deleteMany({});
    }
    async getAll() {
        const allPosts = await Post.find({}).populate('user');
        return allPosts;
    }
    async save(post) {
        const newPost = new Post(post);
        const savedPost = await newPost.save();
        return savedPost;
    }
}

module.exports = new PostService;