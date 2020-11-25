import { Document } from 'mongoose';

export interface Read<T extends Document> {
  findOne (cond: any, fields: any, options: any): Promise<T>;

  find (cond: any, fields: any, options: any, sortOptions?: any): Promise<T[]>;

  countAll (cond: any): Promise<T>;

}
