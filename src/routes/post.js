import express from "express";
import { createPost } from "../controllers/post.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/post", upload.single("image"), createPost);

export default router;
