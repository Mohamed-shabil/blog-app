const Blog = require('../model/blogModel');

const {kafka} = require('../kafka/kafkaClient');


exports.createPost = async(req,res)=>{
    
    try {
        const consumer = kafka.consumer({groupId:"media-service"})
        await consumer.connect()
        await consumer.subscribe({topic:'blog-created'});
        await consumer.run({
            eachMessage: async({message})=>{
                const blogData = JSON.parse(message.value.toString());

                console.log(blogData)

                const blogs = new Blog({
                    authorId: blogData.authorId,
                    title : blogData.title,
                    blog : blogData.blog,
                    coverImage : blogData.coverImage,
                })

                await blogs.save();


                console.log(blogs);
            }
        })
        

    } catch (error) {
        console.log(error)
    }
}



exports.deletePost = async()=>{
    try {  
        const id = '65b4a7d2ec500e0c9a4f1a8e'
        const newBlog = await Blog.findOneAndDelete({_id:id});
        console.log('DONE');
    } catch (error) {
        console.log(error)
    }
}


exports.getBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            blogs
        })
    } catch (error) {
        console(error)
    }
}


exports.getBlog = async (req,res)=>{
    try {
        console.log(req.params)
        const id = req.params.id;
        const blog = await Blog.findOne({_id:id})
        if(!blog){
            return res.status(404).json({
                error:"no blog found"
            }) 
        }
        res.status(200).json({
            blog
        })    
    } catch (error) {
        console.log(error)
    }
}