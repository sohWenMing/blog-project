const { Post } = require('../models');
const PostService = require('../service/posts');
const { app } = require('../app');
const http = require('supertest')(app);

async function httpGetAllRecords() {
    const jsonResponse = await http.get('/api/blog').expect(200).expect('Content-Type', /application\/json/);
    return jsonResponse;
}

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

const listWithDuplicateBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    }
];

const listWithMissingInfo = [
    {
        // title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        // url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: '',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: '',
        likes: 5,
    }
];

async function createInitialPosts() {
    const promiseArray = listWithMultipleBlog.map((blog) => {
        PostService.save(blog);
    });
    await Promise.all(promiseArray);
}

async function createOnePost(post) {
    await PostService.save(post);
}

async function createOneInitialPost() {
    await createOnePost(listWithOneBlog[0]);
}

async function createOnePostNoLikes() {
    await PostService.save({
        title: 'this one has no likes',
        author: 'Me',
        url: 'http://www.google.com'
    });
}

async function deleteAll() {
    await PostService.deleteAll();
}

async function getAll() {
    const allPosts = await PostService.getAll();
    return allPosts;
}

async function createDuplicates() {
    const promiseArray = listWithDuplicateBlogs.map((blog) => {
        PostService.save(blog);
    });
    await Promise.all(promiseArray);
}

function mapIdsFromJsonResponse(jsonResponse) {
    const returnedIds = jsonResponse.body.map((response) => {
        return(response.id);
    });
    return returnedIds;
}

async function getAllUniqueIds() {
    const jsonResponse = await httpGetAllRecords();
    const returnedIds = mapIdsFromJsonResponse(jsonResponse);
    console.log('returnedIds from getAllUniqueIds: ', returnedIds);
    const uniqueIds = [...new Set(returnedIds)];
    const returnedObject = {
        returnedIds, uniqueIds
    };
    return returnedObject;
}

async function createMissingInfoList() {
    listWithMissingInfo.forEach(async(blog) => {
        try {
            await http.post('/api/blog').send(blog).expect(500);
        }
        catch(error) {
            console.log('expected error: ', error);
        }
    });
}

async function httpCreateOne() {
    const jsonResponse = await http.post('/api/blog').send(listWithOneBlog[0]).expect(200);
    const jsonBody = jsonResponse.body;
    return jsonBody;
}

async function httpDeleteById(id) {
    await http.delete(`/api/blog/${id}`);
}

async function httpUpdateById(id) {
    const updatedResponse = await http.put(`/api/blog/${id}`).send(listWithMultipleBlog[2]).expect(200);
    const jsonBody = updatedResponse.body;
    return jsonBody;
}

module.exports = {
    createInitialPosts,
    createOnePost,
    deleteAll,
    getAll,
    createDuplicates,
    httpGetAllRecords,
    http,
    mapIdsFromJsonResponse,
    getAllUniqueIds,
    createOnePostNoLikes,
    createOneInitialPost,
    createMissingInfoList,
    httpCreateOne,
    httpDeleteById,
    httpUpdateById
};