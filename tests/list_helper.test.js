const { dummy, getTotalLikes, favoriteBlog, mostBlogs, favouriteAuthor } = require('../utils/list_helper');
const { test, describe } = require('node:test');
const assert = require('node:assert');

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
];

const listWithMultipleBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Go To Statement Considered Harmful',
        author: 'Soh Wen Ming',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
        __v: 0
    }
];



describe('set of tests for dummy function', () => {
    test('testing dummy function with values', () => {
        assert.strictEqual(dummy([1, 2, 3]), 1);
    });
    test('testing dummy function with no values', () => {
        assert.strictEqual(dummy([]), 1);
    });
});

describe('set of tests for getTotalLikes', () => {
    test('testing for one like', () => {
        assert.strictEqual(getTotalLikes(listWithOneBlog), 5);
    });
    test('testing for no blog posts', () => {
        assert.strictEqual(getTotalLikes([]), 0);
    });
    test('testing for multiple blogposts', () => {
        assert.strictEqual(getTotalLikes(listWithMultipleBlog), 25);
    });
});

describe('set of tests for favoriteBlog', () => {
    test('testing for one blog', () => {
        assert.deepStrictEqual(favoriteBlog(listWithOneBlog),  {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        });
    });
    test('testing for no blogs', () => {
        assert.deepStrictEqual(favoriteBlog([]), undefined);
    });
    test('testing for multiple blogs', () => {
        assert.deepStrictEqual(favoriteBlog(listWithMultipleBlog), {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 10,
            __v: 0
        });
    });
});

describe('set of tests for mostBlog', () => {
    test('testing for one blog record', () => {
        assert.deepStrictEqual(mostBlogs(listWithOneBlog), { name: 'Edsger W. Dijkstra', blogs: 1 });
    });
    test('testing for no records', () => {
        assert.deepStrictEqual(mostBlogs([]), undefined);
    });
    test('testing for multiple records', () => {
        assert.deepStrictEqual(mostBlogs(listWithMultipleBlog), {
            name: 'Edsger W. Dijkstra',
            blogs: 2
        });
    });
});

describe('set of tests for favouriteAuthor', () => {
    test('testing for one record', () => {
        assert.deepStrictEqual(favouriteAuthor(listWithOneBlog), {
            name: 'Edsger W. Dijkstra', likes: 5
        });
    });
    test('testing for no records', () => {
        assert.deepStrictEqual(favouriteAuthor([]), undefined);
    });
    test('testing for multiple records', () => {
        assert.deepStrictEqual(favouriteAuthor(listWithMultipleBlog), {
            name: 'Edsger W. Dijkstra', likes: 15
        });
    });
});