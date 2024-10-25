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

export const createPost = async (req, res) => {
  const { title, body } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    const post = new Post({ title, body, image });
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
    const posts = await Post.find();

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
    const post = await Post.findById(postId);

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
