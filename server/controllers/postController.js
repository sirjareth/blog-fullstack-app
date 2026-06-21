const Post = require('../models/Post');
const { errorHandler } = require('../middleware/auth');

// Create Post
module.exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user.id
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    next(err);
  }
};

// Get All Posts
module.exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'username email');
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// Get Single Post
module.exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// Update Post
module.exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized. You can only update your own post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );

    res.status(200).json({ message: 'Post updated successfully', updatedPost });
  } catch (err) {
    next(err);
  }
};

// Delete Post
module.exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized. You can only delete your own post' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};