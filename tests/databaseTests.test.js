// const { app } = require('../app');
const { describe, it, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const { disconnectFromDB } = require('../models/index');
const { createInitialPosts, createOnePost, deleteAll, getAll, createDuplicates, getAllUniqueIds, createOnePostNoLikes, createOneInitialPost, createMissingInfoList } = require('./test_helper');
const { http } = require('./test_helper');

// const http = require('supertest')(app);


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
        createOneInitialPost();
        const allPosts = await getAll();
        assert.strictEqual(allPosts.length, 1);
    });
    it('saving multiple records should work', async() => {
        await createInitialPosts();
        const allPosts = await getAll();
        assert.strictEqual(allPosts.length, 3);
    });
    it('ids returned should be unique', async() => {
        await createInitialPosts();
        const { returnedIds, uniqueIds } = await getAllUniqueIds();
        assert.strictEqual(returnedIds.length, uniqueIds.length);
    });
    it('saving duplicates should still result in unique ids', async() => {
        await createDuplicates();
        const ids = await getAllUniqueIds();
        const uniqueIds = ids.uniqueIds;
        assert.strictEqual(uniqueIds.length, 2);
    });
    it('saving a post with no likes should default to 0 likes', async() => {
        await createOnePostNoLikes();
        const allPosts = await getAll();
        assert.strictEqual(allPosts[0].likes, 0);
    });
    it('saving without title or url should result in error', async() => {
        await createMissingInfoList();
    });
});