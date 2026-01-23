"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
});
exports.default = (0, serverless_http_1.default)(app_1.default);
