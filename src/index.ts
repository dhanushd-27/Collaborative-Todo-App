import express from "express";
import dotenv from "dotenv"
import { UserRoutes } from "./routes/user.routes";
import { ConnectDB } from "./db/db";
import { ListRoutes } from "./routes/list.routes";

dotenv.config();
ConnectDB();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/v0/user", UserRoutes);
app.use("/api/v0/list", ListRoutes);

// Listen Route
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
})