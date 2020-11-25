import * as hapi from 'hapi';
import Logger from '@utils/logger';
import * as jwt from "@bootstrap/jwt";
import config from '@config/config';

const path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const Pack = require('../../package.json');

const AGENDA_MONGO_URL = config.mongodbAgendaUri || '';
const MONGODB_URI = config.mongodbUri || '';
const REDIS_URI = config.redisUri || '';

export default class Plugins {
  static async register (server: hapi.Server): Promise<void> {
    await this.auth(server);
    await this.swagger(server);
    await this.initViews(server);
    await server.register({ plugin: require('h2o2') });
  }

  static async auth (server: hapi.Server) {
    await this.authJwtClient(server);
    server.auth.default('jwt');
  }

  static async authJwtClient(server: hapi.Server) {
    await server.register(require('@plugins/auth/jwt-hapi').default);
    server.auth.strategy('jwt', 'jwt', jwt.jwtAuthPolicy);
  }

  static swagger (server: hapi.Server) {
    try {
      return server.register([
        Inert,
        Vision,
        {
          plugin: require("hapi-swagger"),
          options: {
            info: {
              title: "Plat MAP Watcher Api",
              description: "Plat MAP Watcher Api Documentation",
              version: Pack.version,
            },
            swaggerUI: true,
            documentationPage: true,
            documentationPath: "/docs"
          }
        }
      ]);
    } catch (err) {
      Logger.info(`Error registering swagger plugin: ${err}`);
    }
  }

  static async initViews (server: any) {
    // Views
    await server.register([Inert, Vision]);

    server.views({
      engines: {
        html: require('handlebars')
      },
      relativeTo: __dirname,
      path: '../views',
      layoutPath: '../views/layout',
      layout: true
    });
  }
}
