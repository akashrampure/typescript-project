"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new Error("All Fields are mandatory!");
        }
        const user = yield userModel_1.default.create({
            username,
            email,
            password,
        });
        winstonLogger_1.default.info("User Created");
        // const token = createToken({ id: user._id, username: user.username });
        // console.log(`token: ${token}`);
        // res.setHeader("Authorization", `Bearer ${token}`);
        res.status(201).send("User created");
    }
    catch (error) {
        winstonLogger_1.default.error("Server Error: ", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = createUser;
