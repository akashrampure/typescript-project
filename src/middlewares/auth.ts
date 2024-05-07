import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/winstonLogger";

dotenv.config();

const secret: string | undefined = process.env.SECRET_KEY;

const createToken = (user: any) => {
  try {
    if (!secret) {
      throw new Error("Secret key not found in environment variables");
    }
    return jwt.sign(user, secret, { expiresIn: "3m" });
  } catch (error) {
    logger.error("Token Couldn't be generated: ", error);
  }
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).send("Access Denied : No Token ");
    }
    if (!secret) {
      throw new Error("Secret key not found in environment variables");
    }
    const decoded: any = jwt.verify(token, secret);
    req.body.user = decoded;
  } catch (error) {
    logger.error("Server Error: ", error);
    res.status(400).send("Invalid Token");
  }
  next();
};

export { createToken, verifyToken };
