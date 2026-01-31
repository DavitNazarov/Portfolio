import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../model/User.model.js";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: "error",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "invalid credentials, please try again",
        status: "error",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: "error",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials, please try again",
        status: "error",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials, please try again",
        status: "error",
      });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ message: "JWT_SECRET not configured", status: "error" });
    }
    const token = jwt.sign({ userId: String(user._id) }, secret, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "Login successful", status: "success", token });
  } catch (error) {
    console.error("Error logging in user", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
      ...(process.env.NODE_ENV !== "production" && { detail: message }),
    });
  }
}
