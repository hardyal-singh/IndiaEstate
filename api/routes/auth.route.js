import express from 'express'
import { signup, signin, google_auth, signout } from '../controllers/auth.controller.js';

const authRouter=express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin", signin);
authRouter.post('/google', google_auth);
authRouter.get('/signout', signout)

export default authRouter;