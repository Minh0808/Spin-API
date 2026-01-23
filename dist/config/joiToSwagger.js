"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJoi = void 0;
const joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
const convertJoi = (schema) => {
    const { swagger } = (0, joi_to_swagger_1.default)(schema);
    return swagger;
};
exports.convertJoi = convertJoi;
