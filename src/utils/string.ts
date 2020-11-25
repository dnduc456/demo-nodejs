import util from 'util';
import { v4 as uuid } from 'uuid';

const generateRandomString = require("randomstring");

/**
 * Generate a random string
 *
 * @param length
 */
export const randomString = (length: number): string => {
  return generateRandomString.generate(length);
};

export const getFileExtension = (str: string): string => {
  return str.substr(str.lastIndexOf('.') + 1);
};

export const generateNameForCsvFeedFile = (fileName: string, date: string, client_id: string, marketplace: string): string => {
  return `mw/${date}/${client_id}/${fileName}-${marketplace}.csv`;
};

/**
 * Returns a formatted string using the first argument as a print-f like format.
 *
 * @param template
 * @param params
 *
 *  %s - String.
 *  %d - Number (both integer and float).
 *  %j - JSON.
 *  %% - single percent sign ('%'). This does not consume an argument.
 */
export const format = (template: string, ...params: any[]): string => {
  return util.format(template, ...params);
};

export const removeNewLines = (s: string): string => {
  return s.replace(/\r?\n?/g, '');
};

/**
 * Remove 0x prefix of Transaction ID
 *
 * @param txId string
 * @returns string
 */
export const reformatTxId = (txId: string): string => {
  const regex = /^0x/;
  if (regex.test(txId)) {
    txId = txId.replace(regex, '');
  }
  return txId;
};

export const isAsin = (asin: string): boolean => {
  const validate: boolean | any = asin.match("^[A-Z0-9]{10}$");
  return !!validate;
};

export const isUpc = (upc: string): boolean => {
  const validate: boolean | any = upc.match("^[0-9]{12}$");
  return !!validate;
};

export const isEan = (ean: string): boolean => {
  const validate: boolean | any = ean.match("^[0-9]{13}$");
  return !!validate;
};

export const convertBufferToString = (buffer: string): string => {
  let base64 = Buffer.from(buffer, 'binary').toString('base64');
  let originalData = Buffer.from(base64, 'base64');
  return originalData.toString();
};

export const removeAllWhiteSpace = (text: string): string => {
  return text.replace(/\s/g, '');
};

export const newUuidV4 = (): string => {
  return uuid();
};

export const tryParseFloat = (s: string): number => {
  try {
    return parseFloat(s);
  } catch (e) {
    return 0;
  }
};

export const isEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const tryParseInt = (s: string): number => {
  try {
    return parseInt(s, 10);
  } catch (e) {
    return 0;
  }
};
