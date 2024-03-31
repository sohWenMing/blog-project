const mongoConnection = require('./models/index');

const mongoose = mongoConnection.mongoose;
const Post = mongoConnection.Post;

const newPost = new Post({
    title: process.argv[2],
    author: process.argv[3],
    url: process.argv[4],
    likes: parseInt(process.argv[5])
});

mongoConnection.connectToDB();
newPost.save().then(() => {
    console.log(`Blog Title: ${process.argv[3]} saved`);
    mongoose.connection.close();
});




