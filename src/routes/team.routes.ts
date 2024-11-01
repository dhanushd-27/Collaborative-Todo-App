import { Router } from "express";
import { addCollaborator, createTeam, removeCollaborator } from "../controllers/team.controllers";
import { userAuth } from "../middlewares/user.auth";
import { collaboratorAuth } from "../middlewares/collaborator.auth";

const TeamRoutes = Router();

TeamRoutes.post("/create", userAuth ,createTeam);

TeamRoutes.post("/:teamid/task", userAuth, collaboratorAuth);

TeamRoutes.put("/:teamid/task/:taskid");

TeamRoutes.delete("/:teamid/task/:taskid");

TeamRoutes.post("/:teamid/collaborator", userAuth, addCollaborator);

TeamRoutes.delete("/:teamid/collaborator/:userid", userAuth, removeCollaborator);

export { TeamRoutes };