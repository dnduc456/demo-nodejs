import * as hapi from 'hapi';
import Config from "@config/config";
import jwt from "jsonwebtoken";

const Boom = require('boom');
const Hoek = require('hoek');
const fs = require('fs');
const path = require('path');

const pluginDefaults = {
  schemeName: 'jwt',
};


const schemeDefaults = {
  validateKey: null,
  headerKey: 'authorization'
};

const verifyJwt = (token: string, key: any, options: any) => {
  try {
    console.log('00000');
    return jwt.verify(token, key, options.verifyOptions);
  } catch (verify_err) {
    throw verify_err;
  }
};

const verifyAuthToken = async (token: string, publicKey: any, options: any, validate: any, request: any, h: any) => {
  const verifyDecoded: any = verifyJwt(token, publicKey, options);
  console.log('1111');
  try {
    // get the credentials for this key:
    const { isValid, credentials } = await validate({ ...verifyDecoded, token }, request, h);
    // if they are valid then continue processing:
    if (isValid && credentials !== undefined) {
      return credentials;
    }
    // otherwise always return a 401:
  } catch (err) {
    // does not have to do anything
  }
  return false;
};

const authSchema = (server: hapi.Server, options: any = {}) => {
  options = Hoek.applyToDefaults(schemeDefaults, options);
  const settings = Hoek.clone(options);
  const portalPublicKey = fs.readFileSync(path.join(__dirname, '../../../', Config.jwtSecret), 'utf8');

  const authenticate = async (request: any, h: any) => {
    const headers = request.headers;
    const authorization = headers[options.headerKey];

    if (!authorization) {
      console.log('22222');
      throw Boom.unauthorized(null, options.tokenType, settings.unauthorizedAttributes);
    }

    const parts = authorization.split(/\s+/);
    if (options.tokenType && parts[0].toLowerCase() !== options.tokenType.toLowerCase()) {
      console.log('33333');
      throw Boom.unauthorized(null, options.tokenType, settings.unauthorizedAttributes);
    }
    const validate = options.validate;
    const token = authorization.replace(/Bearer/gi, '').replace(/ /g, '');

    try {
      const credentials = await verifyAuthToken(token, portalPublicKey, options, validate, request, h);
      console.log('credentials ', credentials);
      if (credentials) {
        return h.authenticated({ credentials });
      }
    } catch (e) {
      let errMessage: string =
          e.message === 'jwt expired'
              ? 'Expired token'
              : 'Invalid token';
      return h.unauthenticated(Boom.unauthorized(errMessage),
          { credentials: token }
      );
    }
    throw Boom.unauthorized('Invalid token');
  };

  return {
    authenticate
  };
};

const register = async (server: hapi.Server, pluginOptions: any) => {
  pluginOptions = Hoek.applyToDefaults(pluginDefaults, pluginOptions);
  server.auth.scheme(pluginOptions.schemeName, authSchema);
  if (pluginOptions.strategy) {
    server.auth.strategy(pluginOptions.strategy.name,
      pluginOptions.schemeName,
      pluginOptions.strategy);
  }
};

const name = 'jwt';
const version = '0.0.1';
export default { register, name, version };
