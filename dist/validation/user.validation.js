"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpDataValidation = exports.signInDataValidation = void 0;
const zod_1 = require("zod");
const signUpDataValidation = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username size shouldn't be less than 3").max(30, "Username exceeds the size limit of username - 30"),
    email: zod_1.z.string().email("Invalid Email input"),
    password: zod_1.z.string().min(8, "Password should be of atleast 8 character")
});
exports.signUpDataValidation = signUpDataValidation;
const signInDataValidation = zod_1.z.object({
    email: zod_1.z.string().email("Invalid Email input"),
    password: zod_1.z.string().min(0, { "message": "Password cannot be empty" })
});
exports.signInDataValidation = signInDataValidation;
