const mongoose  = require('mongoose');

const commentSchema = new mongoose.Schema({
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
    content:{
        type:String,        
    },
    comments:[]
})

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment; 