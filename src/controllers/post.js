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

  try {
    const post = new Post({ title, body });
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
