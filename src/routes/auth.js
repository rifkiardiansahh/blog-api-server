import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").not().isEmpty().withMessage("Password is required"),
    body("name").not().isEmpty().withMessage("Name is required"),
  ],
  validateRequest,
  register
);

export default router;
