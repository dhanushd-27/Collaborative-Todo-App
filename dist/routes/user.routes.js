"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const UserRoutes = (0, express_1.Router)();
exports.UserRoutes = UserRoutes;
UserRoutes.post("/signup", user_controllers_1.userSignUp);
UserRoutes.post("/signin", user_controllers_1.userSignIn);
