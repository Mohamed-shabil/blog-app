const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const {requireAuth,authChecker} = require('./auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mediaRouter = require('./routes/mediaRouter')
const app = express();

dotenv.config();

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

app.use(express.static('upload'));

app.use(morgan('dev'));

app.use(authChecker);

app.use(mediaRouter);

app.listen(3003,()=>{
    console.log('[MEDIA SERVICE] Listening on port 3003');
})