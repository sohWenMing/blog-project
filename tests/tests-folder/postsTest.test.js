const { describe, it, beforeEach, after } = require('node:test');
const { disconnectFromDB } = require('../../models/connection');
const { UserService } = require('../../service/users');
const PostService = require('../../service/posts');
const { usersList } = require('../helpers/usersHelper');
const { postsList } = require('../helpers/postsHelper');
const assert = require('node:assert');
const http = require('../httpModule');
const { User } = require('../../models/users');
const { first } = require('lodash');


async function createAndRelateUserAndPost() {
    const savedUser = await UserService.save(usersList[0]);
    const userId = savedUser._id;
    const postToSave = {
        ...postsList[0],
        user: userId
    };
    const savedPost = await PostService.save(postToSave);
    const userToUpdate = await UserService.findById(savedPost.user._id);
    userToUpdate.posts = userToUpdate.posts.concat(savedPost._id);
    await UserService.update(userToUpdate);
    return({
        savedUser,
        savedPost
    });
};

describe('suite of tests for posts', async() => {
    beforeEach(async() => {
        await UserService.deleteAll();
        await PostService.deleteAll();

    });
    after(async() => {
        await disconnectFromDB();
    });
    it('user should have populated posts', async() => {
        await createAndRelateUserAndPost();
        const allUsers = await http.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        console.log('all users response: ', allUsers.body);
        console.log('all users posts: ', allUsers.body[0].posts);
    });
});