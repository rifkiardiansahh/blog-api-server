import { verifyAccessToken } from "../utils/tokenManager.js";

export const checkAuth = (req, res, next) => {
  const bearer = req.header("Authorization");
  if (bearer) {
    const token = bearer.split(" ")[1];
    try {
      const payload = verifyAccessToken(token);
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
