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
exports.userSignIn = exports.userSignUp = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_validation_1 = require("../validation/user.validation");
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Input Validation
    const isValid = user_validation_1.signUpDataValidation.safeParse(req.body);
    if (!isValid.success) {
        res.status(400).json({
            "Message": "Invalid Data Input",
            "Error": isValid.error.format()
        });
        return;
    }
    // Destrucutre the request body
    const { username, email, password } = req.body;
    // Check whether user already exists or not
    const isFound = yield user_models_1.default.findOne({
        username,
        email
    });
    // Return Conflict Status Code if user exists
    if (!isFound) {
        res.status(409).json({
            "Message": "User Already Exists"
        });
    }
    // Hash Password for Data Security
    const hashPassword = yield bcrypt_1.default.hash(password, 5);
    // Create User
    try {
        yield user_models_1.default.create({
            username,
            email,
            password: hashPassword
        });
        res.status(200).json({
            "Message": "User Created Successfully"
        });
    }
    catch (error) {
        console.error(`Something went wrong ${error}`);
    }
});
exports.userSignUp = userSignUp;
const userSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Input Validation
    const isValid = user_validation_1.signInDataValidation.safeParse(req.body);
    if (!isValid.success) {
        res.status(400).json({
            "Message": "Invalid Data Input",
            "Error": isValid.error.format()
        });
        return;
    }
    // Destructure the request body
    const { email, password } = req.body;
    // find whether user exists or not
    const isFound = yield user_models_1.default.findOne({
        email
    });
    // User does not exist
    if (!isFound) {
        res.status(404).json({
            "message": "User not found!"
        });
        return;
    }
    // Check whether password is valid or not
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, isFound === null || isFound === void 0 ? void 0 : isFound.password);
    if (isPasswordCorrect) {
        const token = jsonwebtoken_1.default.sign({
            email,
            id: isFound === null || isFound === void 0 ? void 0 : isFound._id
        }, process.env.SECRET_KEY);
        res.status(200).json({
            "Message": "User Logged In Successfully",
            token: token
        });
    }
    else {
        res.status(401).json({
            "Message": "Unauthorized User"
        });
        return;
    }
});
exports.userSignIn = userSignIn;
