const express = require('express');
const blogRouter = express.Router();
const { Post, mongooseUtils } = require('../models/index');
const PostService = require('../service/posts');
const { generateAndThrowError } = require('../utils/errorUtils/errorGenerator');
const { decodeTokenAndReturnUser } = require('../routingHelpers/blogRouteHelper');

const convertStringToMongooseId = mongooseUtils.convertStringToMongooseId;

blogRouter.get('/', async(req, res, next) => {
    try {
        const posts = await PostService.getAll();
        const postPromises = posts.map((post) => {
            return post.toJSON();
        });
        const postJsonArray = await Promise.all(postPromises);
        const username = req.userData.username;

        const response = {
            username,
            postJsonArray
        };

        console.log("response sent: ", response);
        res.status(200).json(response);
    }
    catch(error) {
        next(error);
    }
});

blogRouter.post('/', async(req, res, next) => {
    try {
        const { userId, user } = await decodeTokenAndReturnUser(req.token);
        const postToSave  = {
            'title': req.body.title,
            'author': req.body.author,
            'url': req.body.url,
            'likes': req.body.likes,
            'userId': userId
        };
        const savedPost = await PostService.save(postToSave);
        const savedPostJson = await savedPost.toJSON();
        res.status(200).json(savedPostJson);
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
        const { userId, user } = await decodeTokenAndReturnUser(req.token);
        const postId = req.params.id;
        const postToDelete = await PostService.findById(postId);
        const postToDeleteJson = await postToDelete.toJSON();
        if(userId !== postToDeleteJson.user.id) {
            generateAndThrowError('AuthorizationError', 'User is not authorized');
        }
        const deleteResponse = await PostService.deleteById(postId);
        res.status(200).json(deleteResponse);
    }
    catch(error) {
        next(error);
    }
});






module.exports = { blogRouter };