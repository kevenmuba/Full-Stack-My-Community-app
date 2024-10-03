// posts.controller.js
const postsService = require('../services/posts.service');

const createPost = async (req, res) => {
  try {
    const { user_id, content, media_type, media_url, visibility } = req.body;

    // Input validation
    if (!user_id || !content || !media_type || !media_url) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate media_type
    const validMediaTypes = ['image', 'video', 'audio', 'pdf'];
    if (!validMediaTypes.includes(media_type)) {
      return res.status(400).json({ error: 'Invalid media type' });
    }

    const postData = {
      user_id,
      content,
      media_type,
      media_url,
      visibility: visibility || 'public'
    };

    const newPostId = await postsService.createPost(postData);

    res.status(201).json({
      message: 'Post created successfully',
      post_id: newPostId,
    });
  } catch (error) {
    console.error('Error in createPost controller:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

// posts.controller.js

const getAllPosts = async (req, res) => {
  try {
    const posts = await postsService.getAllPosts();
    console.log('Controller - posts type:', Array.isArray(posts) ? 'Array' : typeof posts);
    console.log('Controller - number of posts:', Array.isArray(posts) ? posts.length : 'N/A');

    if (!Array.isArray(posts)) {
      console.error('Posts is not an array:', posts);
      return res.status(500).json({ error: 'Unexpected data format from database' });
    }

    res.json(posts);
  } catch (error) {
    console.error('Error in getAllPosts controller:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postsService.getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error in getPostById controller:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content, media_type, media_url, visibility } = req.body;

    // Input validation
    if (!content || !media_type || !media_url || !visibility) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate media_type
    const validMediaTypes = ['image', 'video', 'audio', 'pdf'];
    if (!validMediaTypes.includes(media_type)) {
      return res.status(400).json({ error: 'Invalid media type' });
    }

    const postData = { content, media_type, media_url, visibility };
    const updated = await postsService.updatePost(postId, postData);

    if (!updated) {
      return res.status(404).json({ error: 'Post not found or no changes made' });
    }

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error in updatePost controller:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deleted = await postsService.deletePost(postId);

    if (!deleted) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.send(' the post is deleted successfully')

    res.status(204).send('');
  } catch (error) {
    console.error('Error in deletePost controller:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};



module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};