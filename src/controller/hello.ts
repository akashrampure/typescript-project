import { Request, Response, NextFunction } from "express";
import logger from "../utils/winstonLogger";

const hello = (req: Request, res: Response, next: NextFunction): void => {
  try {
    logger.info("Accesing hello Route");
    res.send("Hello world");
  } catch (error) {
    res.status(400).send("Error");
    logger.error("Server Error: ", error);
  }
};

export default hello;
