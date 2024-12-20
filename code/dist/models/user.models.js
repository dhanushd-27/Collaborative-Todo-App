"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
