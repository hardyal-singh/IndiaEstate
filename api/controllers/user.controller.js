import { text } from "express";
import { userVerify } from "../utils/userVerify.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const test = (req, res) => {
  res.json({ message: "Hello World" });
};

const updateUser = async (req, res, next) => {
  const { _id } = req.params;
  const { id } = req.user;
  try {
    if (_id != id)
      return next(
        errorHandler(400, "You are not allowed to update this user.")
      );

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const upadeUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          password: req.body.password,
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    upadeUser.password = undefined;
    res.status(200).json(upadeUser);
  } catch (error) {
    next(error);
  }
};

export { test, updateUser };
