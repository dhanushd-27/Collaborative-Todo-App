import { Router } from "express";
import { createTeam } from "../controllers/list.controllers";
import { userAuth } from "../middlewares/user.auth";

const ListRoutes = Router();

ListRoutes.post("/create", userAuth ,createTeam);

// ListRoutes.post("/:listid/task");

// ListRoutes.put("/:listid/task/:taskid");

// ListRoutes.delete("/:listid/task/:taskid");

// ListRoutes.post("/:listid/collaborator");

// ListRoutes.delete("/:listid/collaborator/:userid");

export { ListRoutes };