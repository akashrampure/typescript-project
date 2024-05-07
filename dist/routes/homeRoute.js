"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../controller/homeController");
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
const router = express_1.default.Router();
router.get('/home', homeController_1.createToken);
winstonLogger_1.default.info("In Home Route");
exports.default = router;
