"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
}, { timestamps: true });
const UserModel = mongoose_1.default.model("users", userSchema);
exports.default = UserModel;
