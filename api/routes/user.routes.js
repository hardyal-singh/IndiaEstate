import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { userVerify } from "../utils/userVerify.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.post("/update/:_id", userVerify, updateUser);
userRouter.delete("/delete/:_id", userVerify, deleteUser);

export default userRouter;
