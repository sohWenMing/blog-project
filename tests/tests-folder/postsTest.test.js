const { describe, it, beforeEach, after } = require('node:test');
const { disconnectFromDB } = require('../../models/connection');
const { UserService } = require('../../service/users');
const PostService = require('../../service/posts');
const { usersList } = require('../helpers/usersHelper');
const { postsList } = require('../helpers/postsHelper');
const assert = require('node:assert');
const http = require('../httpModule');

async function createAndLoginUser(index) {
    const savedUserResponse = await http.post('/api/users')
        .send(usersList[index])
        .expect(200)
        .expect('Content-Type', /application\/json/);
    const savedUser = savedUserResponse.body;

    const tokenResponseBody = await http.post('/login')
        .send({
            username: usersList[index].username,
            password: usersList[index].password
        });
    const tokenResponse = tokenResponseBody.body;
    const token = tokenResponse.token;
    return ({ savedUser, token });
}

async function createAndRelateUserAndPost(index) {
    const { savedUser, token } = await createAndLoginUser(index);
    const userId = savedUser.id;

    const postToSave = {
        ...postsList[0],
        userId: userId
    };
    const savedPostResponse = await http.post('/api/blog')
        .set('Authorization', `Bearer ${token}`)
        .send(postToSave)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    const savedPost = savedPostResponse.body;
    return({
        savedUser,
        savedPost,
        token
    });
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

        const { savedPost } = await createAndRelateUserAndPost(0);
        const allUsers = await http.get('/api/users');
        const userToCheck = allUsers.body[0];
        assert.strictEqual(userToCheck.posts.length, 1);
        assert.strictEqual(userToCheck.posts[0].id, savedPost.id);
        const allPosts = await http.get('/api/blog');
        const postToCheck = allPosts.body[0];
        assert.strictEqual(userToCheck.id, postToCheck.user.id);
    });
    it('without a valid token, should raise JsonWebTokenError', async() => {
        const { token } = await createAndLoginUser(0);
        const tokenWrong = token + '123';
        await http.post('/api/blog')
            .set('Authorization', `Bearer ${tokenWrong}`)
            .expect(400);
    });

    it('you should not be able to get to the delete route without a token', async() => {
        await http.delete('/api/blog/1')
            .expect(400);
    });

    it('delete should work if token matches', async() => {
        const { token, savedPost } = await createAndRelateUserAndPost(0);
        const postId = savedPost.id;
        const deleteResponse = await http.delete(`/api/blog/${postId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const deleteResponseBody = deleteResponse.body;
        assert.strictEqual(deleteResponseBody.deletedCount, 1);
    });

    it('if token is wrong to delete, should not work', async() => {
        const { savedPost }= await createAndRelateUserAndPost(0);

        const postId = savedPost.id;
        const { token } = await createAndLoginUser(1);

        const wrongToken = token;
        await http.delete(`/api/blog/${postId}`)
            .set('Authorization', `Bearer ${wrongToken}`)
            .expect(401);
    });

});