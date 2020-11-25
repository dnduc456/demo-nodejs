"use strict";

// Set default timezone
process.env.TZ = 'EST';
require('module-alias/register');
require('dotenv').config();
import '@utils/prototypes';
import bugsnag from 'bugsnag';
import Server from './bootstrap/server';
import Logger from '@utils/logger';

const BUG_SNAG_API_KEY = process.env.BUG_SNAG_API_KEY;
const bugSnagNotify: bugsnag.Bugsnag = bugsnag.register(BUG_SNAG_API_KEY || '');

export default (async () => {
  try {
    const server = Server.instance();
    await server.start();
  } catch (err) {
    Logger.error('Error: ', err);
  }
})();

process.on('uncaughtException', (err: Error) => {
  bugSnagNotify.notify(err);
});
