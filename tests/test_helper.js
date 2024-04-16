const { Post } = require('../models');
const PostService = require('../service/posts');

const listWithOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    }
];

const listWithMultipleBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: 'Here\'s some other title',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
    },
    {
        title: 'Wenming is a god',
        author: 'Soh Wen Ming',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
    }
];

async function createInitialPosts() {
    const promiseArray = listWithMultipleBlog.map((blog) => {
        PostService.save(blog);
    });
    await Promise.all(promiseArray);
}

async function createOnePost() {
    await PostService.save(listWithOneBlog[0]);
}

async function deleteAll() {
    await PostService.deleteAll();
}

async function getAll() {
    const allPosts = await PostService.getAll();
    return allPosts;
}

module.exports = {
    createInitialPosts, createOnePost, deleteAll, getAll
};