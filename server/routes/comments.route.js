const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controller');

router.post('/api/comments', commentController.createComment);

router.get('/api/comments', commentController.getAllComments);
router.get('/api/comments/post/:post_id', commentController.getCommentsByPostId);

router.put('/api/comments/:id', commentController.updateComment);
router.delete('/api/comments/:id', commentController.deleteComment);

module.exports = router;