import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email: email });
  if (!validUser) return next(errorHandler(404, "User not found"));
  const passwordValid = bcrypt.compareSync(password, validUser.password);
  if (!passwordValid) return next(errorHandler(401, "Invalid Credentials"));

validUser.password=undefined
  const aceess_token = await jwt.sign(
    { id: validUser._id },
    process.env.JWT_SECRET
  );

  res
    .cookie('access_token', aceess_token)
    .status(200)
    .json(validUser);
};

export { signup, signin };
