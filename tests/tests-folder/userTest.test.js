const { describe, beforeEach, after, it } = require('node:test');
const assert = require('node:assert');
const http = require('../httpModule');
const { UserService } = require('../../service/users');
const { usersList } = require('../helpers/usersHelper');
const { disconnectFromDB } = require('../../models/connection');

const baseUrl = '/api/users';


describe('tests for creation of users', async() => {
    beforeEach(async() => {
        await UserService.deleteAll();

    });
    after(async() => {
        await disconnectFromDB();
    });
    it('saving one user should work', async() => {
        const response = await http.post(baseUrl)
            .send(usersList[0])
            .expect(200);
    });
    it('duplicate users should not work', async() => {
        await http.post(baseUrl).send(usersList[0]);
        const response = await http.post(baseUrl)
            .send(usersList[0])
            .expect(400);
        assert.strictEqual(response.body.error, 'That username is not available');
    });
    it('request to /api/users should return json of all users', async() => {
        const createdUsersPromiseArray = usersList.map((user) => {
            return UserService.save(user);
        });
        await Promise.all(createdUsersPromiseArray);
        const allUsers = await http.get(baseUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        assert.strictEqual(allUsers.body.length, 2);
    });
});
