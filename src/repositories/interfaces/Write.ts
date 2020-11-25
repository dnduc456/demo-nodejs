import { Document } from 'mongoose';
import { BulkWriteOpResultObject } from "mongodb";

export interface Write<T extends Document> {
  bulkInsert (item: T): Promise<BulkWriteOpResultObject>;

  findOneAndUpdate (cond: any, item: T): Promise<T>;

  softDelete (id: string, client_id?: string): Promise<T>;
}
