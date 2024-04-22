const usersList = [
    {
        username: 'baseUser',
        name: 'Base User',
        password: 'Holoq123holoq123'
    },
    {
        username: 'secondUser',
        name: 'Second User',
        password: 'Pearl250803'
    }
];

const shouldFailUsersList = [
    {
        username: 'ba',
        name: 'Base User',
        password: 'Holoq123holoq123'
    },
    {
        username: 'secondUser',
        name: 'Second User',
        password: 'Pe'
    }
];

module.exports = {
    usersList,
    shouldFailUsersList
};