import User, { UserDocument } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { createToken } from "../middlewares/auth";
import logger from "../utils/winstonLogger";

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("All Fields are mandatory!");
    }
    const user: UserDocument = await User.create({
      username,
      email,
      password,
    });
    logger.info("User Created");
    // const token = createToken({ id: user._id, username: user.username });
    // console.log(`token: ${token}`);
    // res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).send("User created");
  } catch (error) {
    logger.error("Server Error: ", error);
    res.status(500).send("Internal Server Error");
  }
};

export default createUser;
