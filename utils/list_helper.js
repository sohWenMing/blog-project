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
}

module.exports = {
    dummy, getTotalLikes, favoriteBlog
};