export const createBulkOperationUpdateOne = function (filterConditions: any, updateDoc: any, upsert?: boolean, setDefaultsOnInsert?: boolean) {
  return {
    updateOne:
      {
        "filter": filterConditions,
        "update": {
          $set: updateDoc
        },
        upsert: !!upsert,
        setDefaultsOnInsert: !!setDefaultsOnInsert
      }
  };
};

export const createBulkOperationUpdateMany = function (filterConditions: any, updateDoc: any, upsert?: boolean, setDefaultsOnInsert?: boolean) {
  return {
    updateMany:
      {
        "filter": filterConditions,
        "update": {
          $set: updateDoc
        },
        upsert: !!upsert,
        setDefaultsOnInsert: !!setDefaultsOnInsert
      }
  };
};

