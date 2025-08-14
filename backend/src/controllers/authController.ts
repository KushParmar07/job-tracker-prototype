const bcrypt = require("bcrypt");
import prismaClient from "../lib/prisma";
import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function registerUser(req: Request, res: Response) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ message: "Email already exists." });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.log("Error in registerUser", error);
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email and password do not match" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.AUTH_SECRET as jwt.Secret
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  registerUser,
  loginUser,
};
