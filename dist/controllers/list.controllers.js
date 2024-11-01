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
exports.createTeam = void 0;
const team_models_1 = require("../models/team.models");
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get User Data from auth and Title of the group from body
    const { id } = req.user;
    const { title } = req.body;
    try {
        const newTeam = yield team_models_1.TeamModel.create({
            owner: id,
            title: title
        });
        const details = yield team_models_1.TeamModel.findById(newTeam._id).populate('owner');
        console.log(details);
        res.status(200).json({
            "Message": "Teams Created Successfully",
            "Details": {}
        });
    }
    catch (error) {
        res.status(400).json({
            "Message": "Something went wrong!!"
        });
    }
});
exports.createTeam = createTeam;
