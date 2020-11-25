import { TeamMemberEntity } from "@models/entities/TeamMemberEntity";
import { Document } from "mongoose";

export interface ITeamMember extends TeamMemberEntity, Document {
}