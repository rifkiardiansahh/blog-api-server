import express from "express";
import { body } from "express-validator";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.js";
import { upload } from "../middlewares/upload.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.get("/post", getPosts);

router.get("/post/:id", getPostById);

router.post(
  "/post",
  upload.single("image"),
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("body").not().isEmpty().withMessage("Body is required"),
  ],
  validateRequest,
  createPost
);

router.put(
  "/post/:id",
  upload.single("image"),
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("body").not().isEmpty().withMessage("Body is required"),
  ],
  validateRequest,
  updatePost
);

router.delete("/post/:id", deletePost);

export default router;
