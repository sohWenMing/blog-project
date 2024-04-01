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
// const listWithMultipleBlog = [
//     {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//         likes: 5,
//         __v: 0
//     },
//     {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//         likes: 10,
//         __v: 0
//     },
//     {
//         _id: '5a422aa71b54a676234d17f2',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Soh Wen Ming',
//         url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//         likes: 10,
//         __v: 0
//     }
// ];
function mostBlogs(blogPosts) {
    let uniqueNames = [];
    blogPosts.forEach((blog) => {
        if(!uniqueNames.includes(blog.author)) {
            uniqueNames.push(blog.author);
        }
    });
    const authorToLikes = {};
    uniqueNames.forEach((name) => {
        authorToLikes[name] = 0;
    });
    uniqueNames.forEach((name) => {
        blogPosts.forEach((blog) => {
            if(name === blog.author) {
                authorToLikes[name] += blog.likes;
            }
        });
    });
    let maxLikes = 0;
    for(const [key, value] of Object.entries(authorToLikes)) {
        if(value > maxLikes) {
            maxLikes = value;
        }
    }
    let returnedObject = {};
    for(const [key, value] of Object.entries(authorToLikes)) {
        if(value === maxLikes) {
            returnedObject.author = key;
            returnedObject.likes = value;
        }
    }
    return(returnedObject);
}



module.exports = {
    dummy, getTotalLikes, favoriteBlog
};