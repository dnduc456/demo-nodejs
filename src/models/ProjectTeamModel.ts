import { model, Model, Schema } from 'mongoose';
import uuid from 'uuid';
import { IDepartment } from "@models/interfaces/DepartmentEntityInterface";

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const MONGODB = require('@constants/mongodb');

const transform = (doc: IDepartment, ret: any) => {
  ret.id = ret._id.toString();
  delete ret._id;
};

let ProjectTeamSchema = new Schema({
  _id: { type: String, required: true, default: uuid.v4 },
  client_id: { type: String, default: uuid.v4, required: true },
  department_id: { type: String, default: uuid.v4, required: true },
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

ProjectTeamSchema.plugin(mongooseLeanVirtuals);

const ProjectTeamModel: Model<IDepartment> = model<IDepartment>("ProjectTeam", ProjectTeamSchema, `${MONGODB.default.prefix}project_teams`);

export default ProjectTeamModel;
