import mongoose from "mongoose";
import logger from "../utils/winstonLogger";

const db = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING || "");
    console.log("Database connected:", connect.connection.name);
  } catch (error) {
    logger.error("Db failed to connect: ", error);
  }
};

export default db;
