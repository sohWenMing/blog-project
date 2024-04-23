const express = require('express');
const blogRouter = express.Router();
const { Post, mongooseUtils } = require('../models/index');
const PostService = require('../service/posts');
const { UserService } = require('../service/users');
const { verifyToken } = require('../jwt/jwt');
const { generateAndThrowError } = require('../utils/errorUtils/errorGenerator');

const convertStringToMongooseId = mongooseUtils.convertStringToMongooseId;

// blogRouter.post('/tokenTest', async(req, res, next) => {
//     console.log("token test ran");
// });


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
        const decodedToken = verifyToken(req.token);
        const userUpdatingPost = await UserService.findById(decodedToken.data);
        if(!userUpdatingPost) {
            generateAndThrowError('UserNotFoundError', 'There was a problem with the request');
        }
        const postToSave  = {
            'title': req.body.title,
            'author': req.body.author,
            'url': req.body.url,
            'likes': req.body.likes,
            'userId': decodedToken.data
        };
        const savedPost = await PostService.save(postToSave);
        const savedPostJson = await savedPost.toJSON();
        res.status(200).json(savedPostJson);
        // res.status(200).json({message: 'still testing'});

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