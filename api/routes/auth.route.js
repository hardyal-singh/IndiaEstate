import express from 'express'
import { signup, signin, google_auth } from '../controllers/auth.controller.js';

const authRouter=express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin", signin);
authRouter.post('/google', google_auth)

export default authRouter;