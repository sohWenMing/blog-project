const { describe, it, beforeEach, after } = require('node:test');
const { disconnectFromDB } = require('../../models/connection');
const { UserService } = require('../../service/users');
const PostService = require('../../service/posts');
const { usersList } = require('../helpers/usersHelper');
const { postsList } = require('../helpers/postsHelper');
const assert = require('node:assert');
const http = require('../httpModule');
const { User } = require('../../models/users');
const { first, create } = require('lodash');


async function createAndRelateUserAndPost() {
    const savedUser = await UserService.save(usersList[0]);
    const userId = savedUser._id;
    const postToSave = {
        ...postsList[0],
        userId: userId.toString()
    };
    const savedPost = await PostService.save(postToSave);
    const userToUpdate = await UserService.findById(savedPost.user._id);
    userToUpdate.posts = userToUpdate.posts.concat(savedPost._id);
    await UserService.update(userToUpdate);
    return({
        savedUser,
        savedPost
    });
}

async function createAndLoginUser() {
    const savedUser = await http.post('/api/users')
        .send(usersList[0])
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const tokenResponse = await http.post('/login')
        .send({
            username: usersList[0].username,
            password: usersList[0].password
        });
    return ({ savedUser, tokenResponse });
}

describe('suite of tests for posts', async() => {
    beforeEach(async() => {
        await UserService.deleteAll();
        await PostService.deleteAll();

    });
    after(async() => {
        await disconnectFromDB();
    });
    it('should be integrated between users and posts', async() => {
        const { savedUser, tokenResponse } = await createAndLoginUser();

        const postToSave = {
            ...postsList[0],
        };

        const savedPost = await http.post('/api/blog')
            .set('Authorization', `Bearer ${tokenResponse.body.token}`)
            .send(postToSave)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const allUsers = await http.get('/api/users');
        const userToCheck = allUsers.body[0];
        assert.strictEqual(userToCheck.posts.length, 1);
        assert.strictEqual(userToCheck.posts[0].id, savedPost.body.id);
        const allPosts = await http.get('/api/blog');
        const postToCheck = allPosts.body[0];
        assert.strictEqual(userToCheck.id, postToCheck.user.id);
    });
    it('without a valid token, should raise JsonWebTokenError', async() => {
        const { savedUser, tokenResponse } = await createAndLoginUser();
        const token = tokenResponse.body.token + '123';
        await http.post('/api/blog')
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });
});