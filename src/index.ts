import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import db from "./config/dbConnection";
import dotenv from "dotenv";
import homeRoute from "./routes/homeRoute";
import UserRoute from "./routes/userRoute";
import helloRoute from "./routes/helloRoute";
import logger from "./utils/winstonLogger";

dotenv.config();

const port = process.env.PORT || 8000;

db()
  .then(() => {
    logger.info("In Index.js");
    const app: Application = express();
    app.use(express.json());

    app.use(homeRoute);
    app.use(UserRoute);
    app.use(helloRoute);

    app.use(
      (err: Error, req: Request, res: Response, next: NextFunction): void => {
        logger.error("In Error Handling Middleware: ", err);
        res.status(500).send("Internal Server Error");
      }
    );

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((err: any) => {
    logger.error("Error Connecting to database: ", err);
  });
