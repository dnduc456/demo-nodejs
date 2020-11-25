import { model, Model, Schema } from 'mongoose';
import uuid from 'uuid';
import { IDirector } from "@models/interfaces/DirectorEntityInterface";

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const MONGODB = require('@constants/mongodb');

const transform = (doc: IDirector, ret: any) => {
  ret.id = ret._id.toString();
  delete ret._id;
};

let DirectorSchema = new Schema({
  _id: { type: String, required: true, default: uuid.v4 },
  client_id: { type: String, default: uuid.v4, required: true },
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

DirectorSchema.plugin(mongooseLeanVirtuals);

const DirectorModel: Model<IDirector> = model<IDirector>("Director", DirectorSchema, `${MONGODB.default.prefix}directors`);

export default DirectorModel;
