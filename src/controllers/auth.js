import User from "../models/user.js";
import { comparePassword } from "../utils/passwordHasher.js";
import { generateAccessToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to Register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({
      userId: user._id,
      userName: user.name,
    });
    return res
      .status(200)
      .json({ message: "Login successfully", data: { accessToken } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to Login" });
  }
};
