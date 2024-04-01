const express = require('express');
const blogRouter = express.Router();
const { Post, mongoose, mongooseUtils } = require('../models/index');

console.log('mongooseUtils: ', mongooseUtils);
const findPostById = mongooseUtils.convertStringToMongooseId;


blogRouter.get('/', async(req, res, next) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    }
    catch(error) {
        next(error);
    }
});

blogRouter.get('/:id', async(req, res, next) => {
    try{
        const id = findPostById(req.params.id);
        const post = await Post.findById(id);
        res.status(200).json(post);
    }
    catch(error) {
        next(error);
    }
});

blogRouter.delete('/:id', async(req, res, next) => {
    try {
        console.log('delete being hit');
    }
    catch(error) {
        next(error);
    }
});






module.exports = { blogRouter };