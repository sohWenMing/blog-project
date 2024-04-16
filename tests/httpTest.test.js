const { app } = require('../app');
const { describe, it, after, beforeEach } = require('node:test');
const { disconnectFromDB } = require('../models/index');
const PostService = require('../service/posts');


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
});