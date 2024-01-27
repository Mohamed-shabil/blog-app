const mongoose  = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    authorId:{
        type: String,
        required: true,
    },
    coverImage:{
        type:String,
        required:true
    },
    blog:{
        type:String,        
    },
    comments:[]
})

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;