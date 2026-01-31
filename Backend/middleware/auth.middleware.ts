import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const loggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, please login to continue",
        status: "error",
      });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
        status: "error",
      });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized, please login to continue",
        status: "error",
      });
    }
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    return res.status(401).json({
      message: "Unauthorized, please login to continue",
      status: "error",
    });
  }
};
