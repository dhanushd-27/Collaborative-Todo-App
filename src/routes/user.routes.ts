import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/user.controllers";

const UserRoutes = Router();

UserRoutes.post("/signup", userSignUp);
UserRoutes.post("/signin", userSignIn);

export { UserRoutes };