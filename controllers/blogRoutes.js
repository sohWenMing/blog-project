const express = require('express');
const blogRouter = express.Router();
const { Post } = require('../models/index');

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
        const id = (req.params.id);
        const post = await Post.findById(id);
        console.log(post);
    }
    catch(error) {
        next(error);
    }
});


module.exports = { blogRouter };