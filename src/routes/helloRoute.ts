import express from 'express';
import { verifyToken } from '../controller/homeController';
import hello from '../controller/hello';
import logger from '../utils/winstonLogger';


const router = express.Router();


router.get('/hello', verifyToken, hello);
logger.info("In Hello Route")

export default router;