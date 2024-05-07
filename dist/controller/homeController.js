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
const data = {
    page: "homepage",
    task: "generating token",
};
const createToken = (req, res, next) => {
    if (!secret) {
        throw new Error("Secret key not found in environment variables");
    }
    const token = jsonwebtoken_1.default.sign(data, secret, { expiresIn: "5m" });
    res.setHeader("Authorization", `Bearer ${token}`);
    winstonLogger_1.default.info("Token Generated");
    console.log(`token: ${token}`);
    res.status(200).send("Token Generated");
};
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).send("Acces Denied : No Token");
        }
        if (!secret) {
            throw new Error("Secret key not found in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err)
                return res.status(401).send("Acces Denied : No Token");
            winstonLogger_1.default.info("Token verified");
            next();
        });
    }
    catch (error) {
        winstonLogger_1.default.error("Server Error: ", error);
    }
};
exports.verifyToken = verifyToken;
