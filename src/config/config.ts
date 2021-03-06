import 'dotenv/config';
import * as convict from 'convict';

export enum Env {
    Test = 'test',
    Development = 'development',
    Production = 'production',
    Staging = 'staging',
}

export enum LogLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

const convictConfig = convict({
    app: {
        env: {
            doc: 'The current environment of the app',
            format: String,
            enum: Object.values(Env),
            default: Env.Development,
            env: 'NODE_ENV',
        },
        name: {
            doc: 'The name of the current server instance for handling loggers',
            format: String,
            default: 'Scribe API',
            env: 'API_NAME',
        },
        host: {
            doc: 'The host on which the server should run.',
            format: String,
            default: 'localhost',
            env: 'HOST',
        },
        port: {
            doc: 'The port on which the server should run.',
            format: 'port',
            default: 12180,
            env: 'PORT',
        },
        logLevel: {
            doc: 'Logging level, can be log, console, warn, error, info',
            format: String,
            enum: Object.values(LogLevel),
            default: LogLevel.Error,
            env: 'LOG_LEVEL',
        },
        telesignCustomerId: {
            doc: 'TeleSign Customer Id',
            format: String,
            default: '',
            env: 'TELESIGN_CUSTOMER_ID',
        },
        telesignApiKey: {
            doc: 'TeleSign Customer Id',
            format: String,
            default: '',
            env: 'TELESIGN_API_KEY',
        },
    },
});

export { convictConfig };
