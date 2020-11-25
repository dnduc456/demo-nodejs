import { DirectorEntity } from "@models/entities/DirectorEntity";
import { Document } from "mongoose";

export interface IDirector extends DirectorEntity, Document {
}