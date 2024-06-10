import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { userVerify } from "../utils/userVerify.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.post("/update/:_id", userVerify, updateUser);

export default userRouter;
