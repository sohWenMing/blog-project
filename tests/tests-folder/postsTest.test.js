const { describe, it, beforeEach, after } = require('node:test');
const { disconnectFromDB } = require('../../models/connection');
const { UserService } = require('../../service/users');
const PostService = require('../../service/posts');
const { usersList } = require('../helpers/usersHelper');
const { postsList } = require('../helpers/postsHelper');
console.log(usersList);
const assert = require('node:assert');
const http = require('../httpModule');
const { User } = require('../../models/users');


describe('suite of tests for posts', async() => {
    beforeEach(async() => {
        await UserService.deleteAll();
        await PostService.deleteAll();

    });
    after(async() => {
        await disconnectFromDB();
    });
    it('author in post should be populated', async() => {
        const savedUser = await UserService.save(usersList[0]);
        const userId = savedUser._id;
        const postToSave = {
            ...postsList[0],
            user: userId
        };
        const savedPost = await PostService.save(postToSave);
        const userToUpdate = await UserService.findById(savedPost.user._id);
        userToUpdate.posts = userToUpdate.posts.concat(savedPost._id);
        const updatedUser = await UserService.update(userToUpdate);
        const allPosts = await PostService.getAll();
        const allUsers = await UserService.getAll();
        console.log('Post test: ', allPosts[0]);
        console.log('allUsers: ', allUsers[0]);




        // const allPosts = await PostService.getAll();
        // console.log(allPosts[0]);
    });

});

