import { Router } from "express";
import { addCollaborator, createTeam, removeCollaborator } from "../controllers/team.controllers";
import { userAuth } from "../middlewares/user.auth";
// import { collaboratorAuth } from "../middlewares/collaborator.auth";
import { addTask, deleteTask, updateTask } from "../controllers/task.controllers";

const TeamRoutes = Router();

TeamRoutes.post("/create", userAuth ,createTeam);

TeamRoutes.post("/:teamid/task", userAuth, addTask);

TeamRoutes.put("/:teamid/task/:taskid", userAuth, updateTask);

TeamRoutes.delete("/:teamid/task/:taskid", userAuth, deleteTask);

TeamRoutes.post("/:teamid/collaborator", userAuth, addCollaborator);

TeamRoutes.delete("/:teamid/collaborator/:userid", userAuth, removeCollaborator);

export { TeamRoutes };