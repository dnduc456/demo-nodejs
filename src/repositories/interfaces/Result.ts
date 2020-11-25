export interface RawResultInterface<T> {
  lastErrorObject: { n: number, updatedExisting: boolean };
  value: T;
  ok: number;
}

export interface UpdateUpsertInterface {
  n: number;
  nModified: number;
  upserted: {
    index: number,
    _id: string
  };
  ok: number;
}
