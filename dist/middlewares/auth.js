"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
dotenv_1.default.config();
const secret = process.env.SECRET_KEY;
const createToken = (user) => {
    try {
        if (!secret) {
            throw new Error("Secret key not found in environment variables");
        }
        return jsonwebtoken_1.default.sign(user, secret, { expiresIn: "3m" });
    }
    catch (error) {
        winstonLogger_1.default.error("Token Couldn't be generated: ", error);
    }
};
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(400).send("Access Denied : No Token ");
        }
        if (!secret) {
            throw new Error("Secret key not found in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.body.user = decoded;
    }
    catch (error) {
        winstonLogger_1.default.error("Server Error: ", error);
        res.status(400).send("Invalid Token");
    }
    next();
};
exports.verifyToken = verifyToken;
