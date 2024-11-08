"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = require("./routes/user.routes");
const db_1 = require("./db/db");
const team_routes_1 = require("./routes/team.routes");
const ws_1 = require("ws");
dotenv_1.default.config();
(0, db_1.ConnectDB)();
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
// routes
app.use("/api/v0/user", user_routes_1.UserRoutes);
app.use("/api/v0/team", team_routes_1.TeamRoutes);
// Listen Route
const PORT = process.env.PORT;
const server = app.listen(PORT || 3000, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
});
const wss = new ws_1.WebSocketServer({ server });
exports.wss = wss;
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log('received: %s', message);
    });
    ws.send("Connected to web socket");
});
