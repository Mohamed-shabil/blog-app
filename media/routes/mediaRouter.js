const express = require('express')
const { coverImageUpload, imageResize} = require('./../uploadmiddleware');
const router = express.Router();
const {kafka} = require('../kafka/kafkaClient');


const producer = kafka.producer();
 
router.post('/api/posts/upload',coverImageUpload,imageResize, async(req,res)=>{
    try {
        const {title,blog,coverImage} = req.body;
        console.log(req.currentUser._id);
        const authorId = req.currentUser._id
        if(!title | !blog |!coverImage){
            return res.status(404).json({
                error:"some fields are missing "
            });
        }

        await producer.connect();

        const data = {
            title,
            blog,
            coverImage,
            authorId
        }
        const jsonString = JSON.stringify(data);
        const response = await producer.send({
            topic:'blog-created',
            messages: [
                { value: jsonString },
            ],
        })

        console.log(response)
        res.status(200).json({
            message:'blog created'
        })
    } catch (error) {
        console.log(error)
    }finally{
        await producer.disconnect();
    }
})


module.exports = router;