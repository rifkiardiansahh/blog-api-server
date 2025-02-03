import User from "../models/user.js";

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
