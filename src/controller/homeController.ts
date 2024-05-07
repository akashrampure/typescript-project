import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/winstonLogger";
dotenv.config();

const secret: string | undefined = process.env.SECRET_KEY;

const data: object = {
  page: "homepage",
  task: "generating token",
};

const createToken = (req: Request, res: Response, next: NextFunction): any => {
  if (!secret) {
    throw new Error("Secret key not found in environment variables");
  }
  const token: string = jwt.sign(data, secret, { expiresIn: "5m" });
  res.setHeader("Authorization", `Bearer ${token}`);
  logger.info("Token Generated");
  console.log(`token: ${token}`);
  res.status(200).send("Token Generated");
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Acces Denied : No Token");
    }
    if (!secret) {
      throw new Error("Secret key not found in environment variables");
    }
    const decoded = jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).send("Acces Denied : No Token");
      logger.info("Token verified");
      next();
    });
  } catch (error) {
    logger.error("Server Error: ", error);
  }
};

export { createToken, verifyToken };
