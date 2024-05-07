import express from 'express';
import { createToken } from '../controller/homeController';
import logger from '../utils/winstonLogger';

const router = express.Router();


router.get('/home', createToken);
logger.info("In Home Route")

export default router;