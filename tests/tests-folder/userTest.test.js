const { describe, beforeEach, after, it } = require('node:test');
const assert = require('node:assert');
const http = require('../httpModule');
const { UserService } = require('../../service/users');
const { usersList } = require('../helpers/usersHelper');
const { disconnectFromDB } = require('../../models/connection');


describe('tests for creation of users', async() => {
    beforeEach(async() => {
        await UserService.deleteAll();

    });
    after(async() => {
        await disconnectFromDB();
    });
    it('saving one user should work', async() => {
        const response = await http.post('/api/users')
            .send(usersList[0])
            .expect(200);
    });
    it('duplicate users should not work', async() => {
        await http.post('/api/users').send(usersList[0]);
        const response = await http.post('/api/users')
            .send(usersList[0])
            .expect(400);
        assert.strictEqual(response.body.error, 'That username is not available');
    });
});
