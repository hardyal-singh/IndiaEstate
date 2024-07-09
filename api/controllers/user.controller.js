import { text } from "express";
import { userVerify } from "../utils/userVerify.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
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

//@DELETE : delete user account
const deleteUser = async (req, res, next) => {
  const { _id } = req.params;
  const { id } = req.user;
  try {
    if (_id !== id)
      return next(errorHandler(400, "You can delete only your own account"));

    const data = await User.findByIdAndDelete(id);
    if (!res) return next(res);
    res
      .status(200)
      .json({ message: "User deleted successfully" })
      .clearCookie("access_token");
    console.log(res.message);
  } catch (error) {
    next(error);
  }
};

//@GET : get user listings
const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id === req.params._id) {
      const listings = await Listing.find({ userRef: req.params._id });
      res.status(200).json(listings);
    } else {
      return next(errorHandler(500, "Listing not found"));
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) return next(errorHandler(500, "User not found"));
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export { test, updateUser, deleteUser, getUserListings, getUser };
