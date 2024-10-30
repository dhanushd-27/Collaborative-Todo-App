import express from "express";
import dotenv from "dotenv"
import { UserRoutes } from "./routes/user.routes";

dotenv.config();
const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/user/", UserRoutes);

// Listen Route
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
})