"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = require("./routes/user.routes");
const db_1 = require("./db/db");
const list_routes_1 = require("./routes/list.routes");
dotenv_1.default.config();
(0, db_1.ConnectDB)();
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
// routes
app.use("/api/v0/user", user_routes_1.UserRoutes);
app.use("/api/v0/list", list_routes_1.ListRoutes);
// Listen Route
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
});
