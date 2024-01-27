const express = require('express');

const router = express.Router();


router.post('/api/posts/new')

router.patch('/api/post/update');

router.delete('/api/posts/delete');

module.exports = router;