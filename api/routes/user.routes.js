import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
} from "../controllers/user.controller.js";
import { userVerify } from "../utils/userVerify.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.post("/update/:_id", userVerify, updateUser);
userRouter.delete("/delete/:_id", userVerify, deleteUser);
userRouter.get("/listings/:_id", userVerify, getUserListings);
userRouter.get("/:_id", userVerify, getUser);

export default userRouter;
