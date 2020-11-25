import { model, Model, Schema } from 'mongoose';
import uuid from 'uuid';
import {ITeamMember} from "@models/interfaces/TeamMemberEntityInterface";
import {ISetting} from "@models/interfaces/SettingEntityInterface";

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const MONGODB = require('@constants/mongodb');

const transform = (doc: ISetting, ret: any) => {
  ret.id = ret._id.toString();
  delete ret._id;
};

let SettingSchema = new Schema({
  _id: { type: String, required: true, default: uuid.v4 },
  max_member_can_get_once: { type: Number }
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

SettingSchema.plugin(mongooseLeanVirtuals);

const SettingModel: Model<ITeamMember> = model<ITeamMember>("Setting", SettingSchema, `${MONGODB.default.prefix}settings`);

export default SettingModel;
