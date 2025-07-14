import express from "express";
import dotenv from "dotenv";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IAuthController } from "../core/interfaces/controllers/IAuthController";
dotenv.config();
const router = express.Router();

const authController = container.get<IAuthController>(TYPES.AuthController);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/otpverify", authController.verifyOtp);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

router.post('/resend-otp',authController.resendOtp)

export default router;
