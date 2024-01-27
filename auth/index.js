const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter');
const {requireAuth,authChecker} = require('./auth');
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(authChecker);

app.use(authRouter);

app.listen(3001,()=>{
    console.log('[AUTH SERVICE] Listening on port 3001');
})