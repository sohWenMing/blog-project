const express = require('express');
const blogRouter = express.Router();
const { Post, mongoose, mongooseUtils } = require('../models/index');
const PostService = require('../service/posts');

const convertStringToMongooseId = mongooseUtils.convertStringToMongooseId;


blogRouter.get('/', async(req, res, next) => {
    try {
        const posts = await PostService.getAll();
        const postPromises = posts.map((post) => {
            return post.toJSON();
        });
        const postJsonArray = await Promise.all(postPromises);
        res.status(200).json(postJsonArray);
    }
    catch(error) {
        next(error);
    }
});

blogRouter.post('/', async(req, res, next) => {
    try {
        const postToSave  = new Post({
            'title': req.body.title,
            'author': req.body.author,
            'url': req.body.url,
            'likes': req.body.likes
        });
        const savedPost = await postToSave.save();
        res.status(200).json(savedPost);

    }
    catch(error) {
        next(error);
    }
});

blogRouter.put('/:id', async(req, res, next) => {
    try {
        const id = convertStringToMongooseId(req.params.id);
        const previousPost = await Post.findByIdAndUpdate(id, {
            'title': req.body.title,
            'author': req.body.author,
            'url': req.body.url,
            'likes': req.body.likes
        });
        const updatedPost = await Post.findById(id);
        res.status(200).json({
            previousPost, updatedPost
        });
    }
    catch(error) {
        next(error);
    }
});

blogRouter.get('/:id', async(req, res, next) => {
    try{
        const id = convertStringToMongooseId(req.params.id);
        const post = await Post.findById(id);
        res.status(200).json(post);
    }
    catch(error) {
        next(error);
    }
});



blogRouter.delete('/:id', async(req, res, next) => {
    try {
        const id = convertStringToMongooseId(req.params.id);
        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json(deletedPost);
    }
    catch(error) {
        next(error);
    }
});






module.exports = { blogRouter };