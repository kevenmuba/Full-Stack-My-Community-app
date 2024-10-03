const commentService = require('../services/comments.service');

exports.createComment = async (req, res) => {
  try {
    const { post_id, user_id, comment } = req.body;
    
    if (!post_id || !user_id || !comment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    console.log('Attempting to create comment...');
    const newCommentId = await commentService.createComment(post_id, user_id, comment);
    console.log('Comment created with ID:', newCommentId);

    const newComment = await commentService.getCommentById(newCommentId);
    console.log('Retrieved new comment:', newComment);
    
    res.status(201).json({
      message: 'Comment created successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Error in createComment controller:', error);
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json({
      message: 'Comments retrieved successfully',
      comments: comments
    });
  } catch (error) {
    console.error('Error in getAllComments controller:', error);
    res.status(500).json({ message: 'Error retrieving comments', error: error.message });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.post_id;
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json({
      message: 'Comments for post retrieved successfully',
      post_id: postId,
      comments: comments
    });
  } catch (error) {
    console.error('Error in getCommentsByPostId controller:', error);
    res.status(500).json({ message: 'Error retrieving comments for post', error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const updatedComment = await commentService.updateComment(commentId, comment);
    res.status(200).json({
      message: 'Comment updated successfully',
      comment: updatedComment
    });
  } catch (error) {
    console.error('Error in updateComment controller:', error);
    if (error.message === 'Comment not found') {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const result = await commentService.deleteComment(commentId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in deleteComment controller:', error);
    if (error.message === 'Comment not found') {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
  }
};