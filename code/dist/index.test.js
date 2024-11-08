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
const node_test_1 = require("node:test");
const axios_1 = __importDefault(require("axios"));
const BACKEND_URL = "http://localhost:5500";
(0, node_test_1.describe)('User Authentication', () => {
    (0, node_test_1.test)("SignUp", () => __awaiter(void 0, void 0, void 0, function* () {
        const username = `orca${Math.random()}`;
        const email = `orca${Math.random()}.gmail.com`;
        const password = `123123121`;
        const response = yield axios_1.default.post(`${BACKEND_URL}/api/v0/user/signup`, {
            username,
            email,
            password
        });
        expect(response.status).toBe(200);
    }));
});
