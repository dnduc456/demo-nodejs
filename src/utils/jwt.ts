// import moment from 'moment';
import Config from "@config/config";
const fs = require('fs');
const path = require('path');

const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');

export interface ClientInfoTokenInterface {
  user_id: string;
  username: string;
  exp: number;
  client_id: string;
  last_modified_settings: string;
  email: string;
  orig_iat: number;

}

export const decodeJwtToken = (token: string) => {
  return jwtDecode(token);
};

export const createJwt = (data: any, expire: any) => {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../', Config.mwJwtPrivateKey), 'utf8');
  return jwt.sign(data, publicKey, { algorithm: 'RS256', expiresIn: expire });
};

