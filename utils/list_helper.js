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
    console.log(authorToLikes);
}


module.exports = {
    dummy, getTotalLikes, favoriteBlog
};