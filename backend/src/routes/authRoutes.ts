import authController from "../controllers/authController";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);

export default authRouter;
