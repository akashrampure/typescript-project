"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const dotenv_1 = __importDefault(require("dotenv"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const helloRoute_1 = __importDefault(require("./routes/helloRoute"));
const winstonLogger_1 = __importDefault(require("./utils/winstonLogger"));
dotenv_1.default.config();
const port = process.env.PORT || 8000;
(0, dbConnection_1.default)()
    .then(() => {
    winstonLogger_1.default.info("In Index.js");
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(homeRoute_1.default);
    app.use(userRoute_1.default);
    app.use(helloRoute_1.default);
    app.use((err, req, res, next) => {
        winstonLogger_1.default.error("In Error Handling Middleware: ", err);
        res.status(500).send("Internal Server Error");
    });
    app.listen(port, () => {
        winstonLogger_1.default.info(`Server is running on port ${port}`);
    });
})
    .catch((err) => {
    winstonLogger_1.default.error("Error Connecting to database: ", err);
});
