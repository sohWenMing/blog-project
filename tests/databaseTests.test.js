const { app } = require('../app');
const { describe, it, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const { disconnectFromDB } = require('../models/index');
const { createInitialPosts, createOnePost, deleteAll, getAll } = require('./test_helper');


const http = require('supertest')(app);

describe('suite of tests for database', async () =>
{
    beforeEach(async() => {
        await deleteAll();
    });
    after(async () => {
        await deleteAll();
        await disconnectFromDB();
    });
    it('connecting to main url should work', async() => {
        await http.get('/api/blog')
            .expect(200);
    });
    it('saving one record should work', async() => {
        createOnePost();
        const allPosts = await getAll();
        assert(allPosts.length, 1);
    });
    it('saving multiple records should work', async() => {
        await createInitialPosts();
        const allPosts = await getAll();
        console.log('allPosts: ', allPosts);
        assert(allPosts.length, 2);
    });
    it('ids returned should be unique', async() => {
        await createInitialPosts();
        const jsonResponse = await http.get('/api/blog').expect(200).expect('Content-Type', /application\/json/);
        console.log(jsonResponse.body);
        const returnedIds = jsonResponse.body.map((response) => {
            return(response.id);
        }); 
        console.log('returnedIds', returnedIds);
        const uniqueIds = [...new Set(returnedIds)];
        assert.strictEqual(returnedIds.length, uniqueIds.length);
    });

});