const lodash = require('lodash');


const dummy = (blogs) => {
    return 1;
};

function getTotalLikes(blogPosts) {
    const totalLikes = blogPosts.reduce((acc, post) => {
        return acc + post.likes;
    }, 0);
    return totalLikes;
}

function favoriteBlog(blogPosts) {
    if(blogPosts.length === 0) {
        return undefined;
    }
    let likes = 0;
    blogPosts.forEach((blog) => {
        if(blog.likes > likes) {
            likes = blog.likes;
        }
    });
    const favoriteBlog = blogPosts.filter((blog) => {
        return (
            blog.likes === likes
        );
    });
    return(favoriteBlog.length > 0 ? favoriteBlog[0] : undefined);
}
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

function getUniqueNames(blogPosts) {
    let uniqueNames = [];
    blogPosts.forEach((post) => {
        if(!uniqueNames.includes(post.author)) {
            uniqueNames.push(post.author);
        }
    });
    return uniqueNames;
}
function mostBlogs(blogPosts) {
    if(blogPosts.length === 0) {
        return undefined;
    }
    const uniqueNames = getUniqueNames(blogPosts);
    blogPosts.forEach((blog) => {
        if(!uniqueNames.includes(blog.author)) {
            uniqueNames.push(blog.author);
        }
    });
    //gets the list of unique names from the blogs
    let authorToBlogsList = [];
    uniqueNames.forEach((name) => {
        let authorToBlogs = {};
        authorToBlogs.name = name;
        authorToBlogs.blogs = 0;
        blogPosts.forEach((blog) => {
            if(blog.author === name) {
                authorToBlogs.blogs += 1;
            }
        });
        authorToBlogsList.push(authorToBlogs);
    });
    const mostBlogsAuthorObject = lodash.maxBy(authorToBlogsList, 'blogs');
    return mostBlogsAuthorObject;
}

function favouriteAuthor(blogPosts) {
    if(blogPosts.length === 0) {
        return undefined;
    }
    const uniqueNames = getUniqueNames(blogPosts);
    let authorToLikesList = [];
    uniqueNames.forEach((name) => {
        let authorToLikes = {};
        authorToLikes.name = name;
        authorToLikes.likes = 0;
        blogPosts.forEach((blog) => {
            if(blog.author === name) {
                authorToLikes.likes += blog.likes;
            }
        });
        authorToLikesList.push(authorToLikes);
    });
    const mostLikedAuthorObject = lodash.maxBy(authorToLikesList, 'likes');
    return mostLikedAuthorObject;
}

favouriteAuthor(listWithMultipleBlog);



module.exports = {
    dummy, getTotalLikes, favoriteBlog, mostBlogs, favouriteAuthor
};