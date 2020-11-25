import { model, Model, Schema } from 'mongoose';
import uuid from 'uuid';
import {ITeamMember} from "@models/interfaces/TeamMemberEntityInterface";

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const MONGODB = require('@constants/mongodb');

const transform = (doc: ITeamMember, ret: any) => {
  ret.id = ret._id.toString();
  delete ret._id;
};

let TeamMemberSchema = new Schema({
  _id: { type: String, required: true, default: uuid.v4 },
  client_id: { type: String, default: uuid.v4, required: true },
  project_team_id: { type: String, default: uuid.v4, required: true },
  name: { type: String, required: true },
  deleted: { type: Boolean, default: false }
}, {
  toJSON: {
    virtuals: true,
    getters: true,
    transform: transform
  },
  toObject: {
    virtuals: true,
    getters: true,
    transform: transform
  }
});

TeamMemberSchema.plugin(mongooseLeanVirtuals);

const TeamMemberModel: Model<ITeamMember> = model<ITeamMember>("TeamMember", TeamMemberSchema, `${MONGODB.default.prefix}team_members`);

export default TeamMemberModel;
