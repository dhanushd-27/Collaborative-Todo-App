"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(400).json({
            "Message": "Given token is undefined"
        });
    }
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // req.cookies is not secured ig
        req.cookies = decodedData;
        next();
    }
    catch (error) {
        res.status(403).json({
            "Message": "Unauthorized User"
        });
    }
};
exports.userAuth = userAuth;
