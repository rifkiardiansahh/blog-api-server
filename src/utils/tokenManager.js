import jwt from "jsonwebtoken";

export const generateAccessToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, "qasdfedavmjuaqpa", { expiresIn });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, "qasdfedavmjuaqpa");
};
