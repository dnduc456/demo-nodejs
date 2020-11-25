import { DepartmentEntity } from "@models/entities/DepartmentEntity";
import { Document } from "mongoose";

export interface IDepartment extends DepartmentEntity, Document {
}