import mongoose from "mongoose";
import { passwordHasher } from "../utils/passwordHasher.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashed = await passwordHasher(this.get("password"));
    this.set("password", hashed);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
