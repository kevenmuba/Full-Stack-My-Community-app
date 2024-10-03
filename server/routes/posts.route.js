// posts.route.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

// Create a new post
router.post('/api/posts', postsController.createPost);
// Get all posts
router.get('/api/posts', postsController.getAllPosts);
// Get a post by ID
router.get('/api/posts/:id', postsController.getPostById);
// Update a post
router.put('/api/posts/:id', postsController.updatePost);

// Delete a post
router.delete('/api/posts/:id', postsController.deletePost);


module.exports = router;