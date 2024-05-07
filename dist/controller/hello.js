"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
const hello = (req, res, next) => {
    try {
        winstonLogger_1.default.info("Accesing hello Route");
        res.send("Hello world");
    }
    catch (error) {
        res.status(400).send("Error");
        winstonLogger_1.default.error("Server Error: ", error);
    }
};
exports.default = hello;
