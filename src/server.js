// import express from "express";
// import mongoose from "mongoose";

// const app = express();
// const port = 3000;

// mongoose.connect(`mongodb://localhost:27017/blogDB`);
// .then(() => app.listen(port))
// .then(() => console.log(`Database successfully connected an app listening on port ${port}`))
// .then(err => console.log('Connection error', err))

import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose
  .connect(`mongodb://localhost:27017/blogDB`)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Database successfully connected and app listening on port ${port}`
      );
    });
  })
  .catch((err) => console.log("Connection error", err));
