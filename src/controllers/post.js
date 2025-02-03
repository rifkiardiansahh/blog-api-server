// import Post from "../models/post.js";

// export const createPost = async (res, req) => {
//   const { title, body } = req.body;

//   try {
//     const post = new Post({ title, body });
//     const savedPost = await post.save();

//     return res.status(201).json({
//       message: "Post created successfully",
//       data: savedPost,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Unable to create post" });
//   }
// };

import Post from "../models/post.js";
import { uploadRemover } from "../utils/uploadRemover.js";

export const createPost = async (req, res) => {
  const { title, body } = req.body;
  const { userId } = req.user;
  const image = req.file ? req.file.filename : null;
  try {
    const post = new Post({ title, body, image, author: userId });
    const savedPost = await post.save();

    return res.status(201).json({
      message: "Post created successfully",
      data: savedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to create post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");

    return res.status(200).json({
      message: "Posts Found",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post found",
      data: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving post" });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.user;
  const { title, body } = req.body;
  const newImage = req.file ? req.file.filename : null;

  try {
    const post = await Post.findById(postId).populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author._id.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (newImage) {
      uploadRemover(post.image);
    }

    post.title = title;
    post.body = body;
    post.image = newImage ? newImage : post.image;

    const updatePost = await post.save();

    return res.status(200).json({
      message: "Post updated",
      data: updatePost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.user;

  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author._id.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    uploadRemover(post.image);

    return res.status(200).json({
      message: "Post deleted",
      data: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting post" });
  }
};
