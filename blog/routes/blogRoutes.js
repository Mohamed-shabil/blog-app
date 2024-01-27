const express = require('express');

const router = express.Router();

const { getBlogs,getBlog } = require('../controller/blogController')

router.get('/api/blogs/show',getBlogs);

router.get('/api/blogs/:id',getBlog);

module.exports = router