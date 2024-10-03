// posts.service.js
const db = require('../config/db.config');

const createPost = async (postData) => {
  const { user_id, content, media_type, media_url, visibility } = postData;

  const query = `
    INSERT INTO posts (user_id, content, media_type, media_url, visibility)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const result = await db.query(query, [user_id, content, media_type, media_url, visibility]);
    console.log('Query result:', result); // For debugging

    if (result && Array.isArray(result) && result.length > 0 && result[0].insertId) {
      return result[0].insertId;
    } else if (result && result.insertId) {
      return result.insertId;
    } else {
      throw new Error('Failed to get insertId from query result');
    }
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Error creating post: ' + error.message);
  }
};

// posts.service.js

const getAllPosts = async () => {
  const query = `
    SELECT p.*, u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.visibility = 'public'
    ORDER BY p.created_at DESC
  `;

  try {
    const rows = await db.query(query);
    console.log('Service layer - rows type:', Array.isArray(rows) ? 'Array' : typeof rows);
    console.log('Service layer - number of rows:', Array.isArray(rows) ? rows.length : 'N/A');
    return rows;
  } catch (error) {
    console.error('Error in getAllPosts service:', error);
    throw error;
  }
};

const getPostById = async (id) => {
  const query = `
    SELECT p.*, u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `;

  try {
    const rows = await db.query(query, [id]);
    console.log('Service layer - getPostById result:', rows);
    return rows[0]; // Return the first (and should be only) result
  } catch (error) {
    console.error('Error in getPostById service:', error);
    throw error;
  }
};


const updatePost = async (id, postData) => {
  const { content, media_type, media_url, visibility } = postData;
  const query = `
    UPDATE posts
    SET content = ?, media_type = ?, media_url = ?, visibility = ?
    WHERE id = ?
  `;

  try {
    const result = await db.query(query, [content, media_type, media_url, visibility, id]);
    console.log('Service layer - updatePost result:', result);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error in updatePost service:', error);
    throw error;
  }
};

const deletePost = async (id) => {
  const query = 'DELETE FROM posts WHERE id = ?';

  try {
    const result = await db.query(query, [id]);
    console.log('Service layer - deletePost result:', result);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error in deletePost service:', error);
    throw error;
  }
};


module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};