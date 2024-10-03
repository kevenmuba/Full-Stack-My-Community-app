const db = require('../config/db.config');

exports.createComment = async (postId, userId, comment) => {
  const query = 'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)';
  try {
    const result = await db.query(query, [postId, userId, comment]);
    return result.insertId;
  } catch (error) {
    console.error('Error in createComment service:', error);
    throw error;
  }
};

exports.getCommentById = async (commentId) => {
  const query = 'SELECT * FROM comments WHERE id = ?';
  try {
    const [comment] = await db.query(query, [commentId]);
    return comment;
  } catch (error) {
    console.error('Error in getCommentById service:', error);
    throw error;
  }
};

exports.getAllComments = async () => {
  const query = 'SELECT * FROM comments ORDER BY created_at DESC';
  try {
    const comments = await db.query(query);
    return comments;
  } catch (error) {
    console.error('Error in getAllComments service:', error);
    throw error;
  }
};

exports.getCommentsByPostId = async (postId) => {
  const query = 'SELECT * FROM comments WHERE id = ? ORDER BY created_at DESC';
  try {
    const comments = await db.query(query, [postId]);
    return comments;
  } catch (error) {
    console.error('Error in getCommentsByPostId service:', error);
    throw error;
  }
};

exports.updateComment = async (commentId, newContent) => {
  const query = 'UPDATE comments SET comment = ? WHERE id = ?';
  try {
    const result = await db.query(query, [newContent, commentId]);
    if (result.affectedRows === 0) {
      throw new Error('Comment not found');
    }
    return await this.getCommentById(commentId);
  } catch (error) {
    console.error('Error in updateComment service:', error);
    throw error;
  }
};

exports.deleteComment = async (commentId) => {
  const query = 'DELETE FROM comments WHERE id = ?';
  try {
    const result = await db.query(query, [commentId]);
    if (result.affectedRows === 0) {
      throw new Error('Comment not found');
    }
    return { message: 'Comment deleted successfully' };
  } catch (error) {
    console.error('Error in deleteComment service:', error);
    throw error;
  }
};