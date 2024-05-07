import express from "express";
import { verifyToken } from "../controller/homeController";
import createUser from "../controller/userController";
import logger from "../utils/winstonLogger";

const router = express.Router();

router.post("/user", verifyToken , createUser);
logger.info("In User Route");

export default router;
