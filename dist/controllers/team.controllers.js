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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCollaborator = exports.addCollaborator = exports.createTeam = void 0;
const team_models_1 = require("../models/team.models");
const mongoose_1 = __importDefault(require("mongoose"));
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
        res.status(201).json({
            "Message": "Teams Created Successfully",
            "Details": details
        });
    }
    catch (error) {
        res.status(400).json({
            "Message": "Something went wrong!!"
        });
    }
});
exports.createTeam = createTeam;
const addCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamid = req.params.teamid;
    const newCollaboratorId = req.body.id;
    // check whether the list already exists or not
    const isFound = yield team_models_1.TeamModel.findOne({
        _id: teamid
    });
    if (!isFound) {
        res.status(404).json({
            "Message": "Given Team doesn't exist"
        });
        return;
    }
    // check whether the collaborator is already present in the list or not
    const doesExist = isFound.collaborators.includes(newCollaboratorId);
    if (doesExist) {
        res.status(409).json({
            "Message": "Already a team member"
        });
        return;
    }
    // if not add the new collaborator
    // add collaborator
    yield team_models_1.TeamModel.updateOne({
        _id: teamid
    }, {
        $push: { collaborators: newCollaboratorId }
    });
    // Fetch Collaborators data
    const PopulateCollaborators = yield team_models_1.TeamModel
        .findOne({ _id: teamid })
        .populate('collaborators');
    // try to store only username in a list later
    const CollaboratorList = PopulateCollaborators === null || PopulateCollaborators === void 0 ? void 0 : PopulateCollaborators.collaborators;
    res.status(200).json({
        "Message": "Collaborator Added Successfully",
        "Collaborators": CollaboratorList
    });
});
exports.addCollaborator = addCollaborator;
const removeCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamid, userid } = req.params;
    // Convert the parameters to ObjectId
    const teamIdObjectId = new mongoose_1.default.Types.ObjectId(teamid);
    const userIdObjectId = new mongoose_1.default.Types.ObjectId(userid);
    // check whether the list already exists or not
    const isFound = yield team_models_1.TeamModel.findOne({
        _id: teamIdObjectId
    });
    if (!isFound) {
        res.status(404).json({
            "Message": "Given Team doesn't exist"
        });
        return;
    }
    // check whether the collaborator is already present in the list or not
    const doesExist = isFound.collaborators.includes(userIdObjectId, 0);
    if (!doesExist) {
        res.status(409).json({
            "Message": "Given Id doesn't belong to the team"
        });
        return;
    }
    const details = yield team_models_1.TeamModel.updateOne({
        _id: teamIdObjectId
    }, {
        $pull: { collaborators: userIdObjectId }
    });
    res.json({
        "Message": "Successfully removed Collaborator",
        details: details
    });
});
exports.removeCollaborator = removeCollaborator;
