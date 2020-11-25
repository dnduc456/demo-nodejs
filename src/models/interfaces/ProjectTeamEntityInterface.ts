import { ProjectTeamEntity } from "@models/entities/ProjectTeamEntity";
import { Document } from "mongoose";

export interface IProjectTeam extends ProjectTeamEntity, Document {
}