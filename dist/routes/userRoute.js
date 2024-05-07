"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../controller/homeController");
const userController_1 = __importDefault(require("../controller/userController"));
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
const router = express_1.default.Router();
router.post("/user", homeController_1.verifyToken, userController_1.default);
winstonLogger_1.default.info("In User Route");
exports.default = router;
