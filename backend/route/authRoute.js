import express from 'express';
import { signUp, login, logout, googleAuth } from '../controller/authController.js';
import { sendOTP, verifyOTP, resetPassword } from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/login",login);
authRouter.get("/logout",logout);
authRouter.post("/sendotp",sendOTP);
authRouter.post("/verifyotp",verifyOTP);
authRouter.post("/resetpassword",resetPassword);
authRouter.post("/googleauth", googleAuth);

export default authRouter