const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require('../controllers/postController');
const { verify } = require('../middleware/auth');

// Public Routes
router.get('/', getAllPosts);
router.get('/:id', getPost);

// Protected Routes (need token)
router.post('/', verify, createPost);
router.put('/:id', verify, updatePost);
router.delete('/:id', verify, deletePost);

module.exports = router;