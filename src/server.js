import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import mongoSanitize from "express-mongo-sanitize";

import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";

const app = express();
const port = 3000;

app.use(express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(mongoSanitize());

app.use(cors({ origin: "*" }));

app.use("/api/v1/blog", postRoutes);
app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Database successfully connected and app listening on port ${port}`
      );
    });
  })
  .catch((err) => console.log("Connection error", err));
