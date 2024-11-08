"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collaboratorAuth = void 0;
const mongoose_1 = require("mongoose");
const team_models_1 = require("../models/team.models");
const Object = mongoose_1.Types.ObjectId;
const collaboratorAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new Object(req.user.id);
    const teamid = new Object(req.params.teamid);
    const TeamDetails = yield team_models_1.TeamModel.findOne({
        _id: teamid,
    });
    const isFound = TeamDetails === null || TeamDetails === void 0 ? void 0 : TeamDetails.collaborators.includes(id, 0);
    if (!isFound) {
        res.status(403).json({
            "Message": "Unauthorized Access!"
        });
    }
    else {
        next();
    }
});
exports.collaboratorAuth = collaboratorAuth;
