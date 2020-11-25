class ConfigClass {
  _processConcurrency: number;
  _mongodbUri: string;
  _mongodbUriTest?: string;
  _port: number;
  _logDir?: string;
  _jwtSecret: string;
  _mwJwtPrivateKey: string;
  _mwJwtPublicKey: string;
  _mongodbAgendaUri: string;
  _redisUri: string;
  _consoleLog: string | undefined;
  _consoleLogMethod: string;
  _nodeEnv: string;

  constructor () {
    this._processConcurrency = parseInt(process.env.PROCESS_CONCURRENCY || '5', 10);
    this._mongodbUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/demo';
    this._mongodbUriTest = process.env.MONGODB_URI_TEST;
    this._port = parseInt(process.env.PORT || '3000', 10);
    this._logDir = process.env.LOG_DIR || './logs';
    this._jwtSecret = process.env.JWT_SECRET || 'certificates/public_key.pem';
    this._mwJwtPrivateKey = process.env.MW_JWT_PRIVATE_KEY || 'certificates/mw_private_key.pem';
    this._mwJwtPublicKey = process.env.MW_JWT_PUBLIC_KEY || 'certificates/mw_public_key.pem';
    this._mongodbAgendaUri = process.env.AGENDA_MONGO_URL || this._mongodbUri;
    this._redisUri = process.env.REDIS_URI || '';

    this._nodeEnv = process.env.NODE_ENV || 'production';
    this._consoleLog = process.env.hasOwnProperty('CONSOLE_LOG') ? process.env.CONSOLE_LOG : '1';
    this._consoleLogMethod = process.env.CONSOLE_LOG_METHOD || 'emerg|alert|error|crit|warning|notice|info|debug';
  }

  get nodeEnv (): string {
    return this._nodeEnv;
  }

  get consoleLog (): string | undefined {
    return this._consoleLog;
  }

  get consoleLogMethod (): string {
    return this._consoleLogMethod;
  }

  get processConcurrency (): number {
    return this._processConcurrency;
  }

  get logDir (): string | undefined {
    return this._logDir;
  }

  get mongodbUriTest (): string | undefined {
    return this._mongodbUriTest;
  }

  get mongodbUri (): string {
    return this._mongodbUri;
  }

  get port (): number {
    return this._port;
  }

  get jwtSecret (): string {
    return this._jwtSecret;
  }

  get mwJwtPrivateKey (): string {
    return this._mwJwtPrivateKey;
  }

  get mwJwtPublicKey (): string {
    return this._mwJwtPublicKey;
  }

  get mongodbAgendaUri (): string {
    return this._mongodbAgendaUri;
  }

  get redisUri (): string {
    return this._redisUri;
  }
}

const config = new ConfigClass();
export default config;
