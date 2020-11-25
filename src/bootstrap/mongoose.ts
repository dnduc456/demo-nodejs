import mongoose from 'mongoose';

const debug = require('debug')('bootstrap.mongoose');

export const connect = async (mongoUri: any) => {
  try {
    mongoUri = mongoUri || process.env.MONGODB_URI;
    let options = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, poolSize: 10 };
    await mongoose.connect(mongoUri, options);
    mongoose.connection.once('open', async () => {
      debug('Connected mongodb successfully');
    });
    mongoose.connection.once('error', (err: Error) => {
      debug('Connected mongodb failed: ', err);
    });
  } catch (e) {
    debug('Connect Error: ', e);
  }
};
