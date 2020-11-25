import { model, Model, Schema } from 'mongoose';
import uuid from 'uuid';
import { IDepartment } from "@models/interfaces/DepartmentEntityInterface";

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const MONGODB = require('@constants/mongodb');

const transform = (doc: IDepartment, ret: any) => {
  ret.id = ret._id.toString();
  delete ret._id;
};

let DepartmentSchema = new Schema({
  _id: { type: String, required: true, default: uuid.v4 },
  client_id: { type: String, default: uuid.v4, required: true },
  director_id: { type: String, default: uuid.v4, required: true }, // this will be director id
  manager_id: { type: String, default: null }, // this will be manager id of this department
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

DepartmentSchema.plugin(mongooseLeanVirtuals);

const DepartmentModel: Model<IDepartment> = model<IDepartment>("Department", DepartmentSchema, `${MONGODB.default.prefix}departments`);

export default DepartmentModel;
