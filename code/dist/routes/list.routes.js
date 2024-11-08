"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRoutes = void 0;
const express_1 = require("express");
const list_controllers_1 = require("../controllers/list.controllers");
const user_auth_1 = require("../middlewares/user.auth");
const ListRoutes = (0, express_1.Router)();
exports.ListRoutes = ListRoutes;
ListRoutes.post("/create", user_auth_1.userAuth, list_controllers_1.createTeam);
