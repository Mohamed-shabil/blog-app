const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const blogRouter = require('./routes/blogRoutes');
const {requireAuth,authChecker} = require('./auth');
const {createPost,deletePost} = require('./controller/blogController')
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Db Connected Successfully');
}).catch((err)=>{
    console.log(err);
})

app.use(cors({
    origin:'http://localhost:3000',
    methods:['POST','GET','DELETE'],
    credentials: true,
}))

app.options('*', cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());

app.use(morgan('dev'));

app.use(authChecker);

// deletePost();

createPost();


app.use(blogRouter);

app.listen(3002,()=>{
    console.log('[BLOG SERVICE] Listening on port 3002');
})