import { SettingEntity } from "@models/entities/SettingEntity";
import { Document } from "mongoose";

export interface ISetting extends SettingEntity, Document {
}