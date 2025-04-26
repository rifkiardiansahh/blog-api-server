// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import "dotenv/config";
// import mongoSanitize from "express-mongo-sanitize";
// import { rateLimit } from "express-rate-limit";

// import postRoutes from "./routes/post.js";
// import authRoutes from "./routes/auth.js";

// const app = express();
// const port = 3000;

// app.use(express.static("public/uploads"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 100,
//     standardHeaders: "draft-8",
//     legacyHeaders: false,
//     message: {
//       message: "Too many requests, please try again later.",
//     },
//   })
// );

// app.use(mongoSanitize());

// app.use(cors({ origin: "*" }));

// app.use("/api/v1/blog", postRoutes);
// app.use("/api/v1/auth", authRoutes);

// app.all("*", (req, res) => {
//   res.status(404).send("Page not found");
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(port, () => {
//       console.log(
//         `Database successfully connected and app listening on port ${port}`
//       );
//     });
//   })
//   .catch((err) => console.log("Connection error", err));
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";

import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware
app.use(express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      message: "Too many requests, please try again later.",
    },
  })
);

app.use(mongoSanitize());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api/v1/blog", postRoutes);
app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Export app untuk Vercel
export default app;

// Fungsi terpisah untuk koneksi database dan start server (untuk development)
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database successfully connected");

    // Hanya start server jika tidak di Vercel
    if (process.env.VERCEL !== "1") {
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  } catch (err) {
    console.log("Connection error", err);
  }
};

startServer();
