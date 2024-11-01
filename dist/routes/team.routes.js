"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const express_1 = require("express");
const team_controllers_1 = require("../controllers/team.controllers");
const user_auth_1 = require("../middlewares/user.auth");
// import { collaboratorAuth } from "../middlewares/collaborator.auth";
const task_controllers_1 = require("../controllers/task.controllers");
const TeamRoutes = (0, express_1.Router)();
exports.TeamRoutes = TeamRoutes;
TeamRoutes.post("/create", user_auth_1.userAuth, team_controllers_1.createTeam);
TeamRoutes.post("/:teamid/task", user_auth_1.userAuth, task_controllers_1.addTask);
TeamRoutes.put("/:teamid/task/:taskid", user_auth_1.userAuth, task_controllers_1.updateTask);
TeamRoutes.delete("/:teamid/task/:taskid", user_auth_1.userAuth, task_controllers_1.deleteTask);
TeamRoutes.post("/:teamid/collaborator", user_auth_1.userAuth, team_controllers_1.addCollaborator);
TeamRoutes.delete("/:teamid/collaborator/:userid", user_auth_1.userAuth, team_controllers_1.removeCollaborator);
