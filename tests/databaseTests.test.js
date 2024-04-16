const { app } = require('../app');
const { describe, it, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const { disconnectFromDB, Post } = require('../models/index');
const PostService = require('../service/posts');
const { listWithOneBlog, listWithMultipleBlog } = require('./test_helper');

const http = require('supertest')(app);

describe('is this first test running', async () =>
{
    beforeEach(async() => {
        await PostService.deleteAll();
    });
    after(async () => {
        await disconnectFromDB();
    });
    it('connecting to main url should work', async() => {
        await http.get('/api/blog')
            .expect(200);
    });
    it('saving one record should work', async() => {
        const savedResponse = await PostService.save(listWithOneBlog[0]);
        const allPosts = await PostService.getAll();
        assert(allPosts.length, 1);
    });
    it('saving multiple records should work', async() => {
        const blogPromises = listWithMultipleBlog.map((blog) => PostService.save(blog));
        await Promise.all(blogPromises);
        const allPosts = await PostService.getAll();
        assert(allPosts.length, 2);

    });
});