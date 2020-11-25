"use strict";

import * as hapi from 'hapi';
import * as db from './mongoose';
import routes from './routes';
import Plugins from './plugins';
import config from '@config/config';
import Logger from '@utils/logger';
import Bull from 'bull';
import _ from 'lodash';


const MONGODB_URI = config.mongodbUri;
const PORT = config.port || '3001';

export default class Server {
  private static _instance: Server;
  public server: hapi.Server;

  private defaultOptions = {
    port: PORT,
    host: '0.0.0.0',
    routes: {
      cors: true,
    }
  };

  private constructor (options: any = {}) {
    options = Object.assign({}, this.defaultOptions, options);
    this.server = new hapi.Server(options);
  }

  get plugins (): any {
    return this.server.plugins;
  }

  getPluginByName (name: string, key: string): any {
    const plugins = this.plugins;
    if (name in plugins && key in plugins[name]) {
      return plugins[name][key];
    }
    return null;
  }

  static instance (options: any = {}): Server {
    if (!Server._instance) {
      Server._instance = new Server(options);
    }
    return Server._instance;
  }

  public async init (): Promise<void> {
    await this.initDb();
    await this.initPlugins();
    await this.initRoutes();
    this.hapiArena();
  }

  hapiArena () {
    const port: number = Math.floor(Math.random() * 1000) + 16000;
    const basePath: string = '/arena';

    this.server.ext('onPostStart', (server: hapi.Server): void => {

      server.route({
        path: basePath + '/{path*}',
        method: ['GET', 'POST', 'DELETE'],
        options: {
          auth: false
        },
        handler: {
          proxy: {
            host: '0.0.0.0',
            port: port,
            passThrough: true,
            redirects: 5
          }
        }
      });
    });
  }

  private async initDb () {
    await db.connect(MONGODB_URI);
  }

  public async initRoutes (): Promise<void> {
    await this.addRoutes(routes);
  }

  private async initPlugins (): Promise<void> {
    await Plugins.register(this.server);
  }

  async addRoutes (routes: any): Promise<void> {
    this.server.route(routes);
  }

  async start (): Promise<void> {
    try {
      await this.init();
      await this.server.start();
      Logger.info("This server start on port " + PORT);
    } catch (error) {
      Logger.error(error);
      // process.exit(1);
    }
  }

}
