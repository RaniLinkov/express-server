"use strict";

import {EMPTY_STRING} from "../constants.js";

const getEnvVariable = (key, defaultValue = undefined) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is missing and no default value was provided.`);
    }
    return value;
}

const config = {
    APP_NAME: getEnvVariable('APP_NAME', 'app name'),
    PORT: getEnvVariable('PORT', 3000),
    NODE_ENV: getEnvVariable('NODE_ENV', 'development'),
    ALLOWED_ORIGINS: getEnvVariable('ALLOWED_ORIGINS', EMPTY_STRING).split(','),
    DB: {
        client: 'pg',
        connection: {
            host: getEnvVariable('DB_HOST', '127.0.0.1'),
            port: getEnvVariable('DB_PORT', '5432'),
            user: getEnvVariable('DB_USER', 'postgres'),
            password: getEnvVariable('DB_PASSWORD', 'mysecretpassword'),
            database: getEnvVariable('DB_NAME', 'postgres'),
        },
        pool: {
            min: parseInt(getEnvVariable('DB_POOL_MIN', '2')),
            max: parseInt(getEnvVariable('DB_POOL_MAX', '10'))
        },
    },
    CACHE: {
        host: getEnvVariable('CACHE_HOST', '127.0.0.1'),
        port: getEnvVariable('CACHE_PORT', 6379),
    },
    PRIVATE_KEY: getEnvVariable('PRIVATE_KEY'),
    PUBLIC_KEY: getEnvVariable('PUBLIC_KEY'),
    MFA_SECRET: getEnvVariable('MFA_SECRET'),
    MAILER: {
        host: getEnvVariable('MAILER_HOST'),
        port: parseInt(getEnvVariable('MAILER_PORT')),
        secure: getEnvVariable('MAILER_SECURE', true),
        auth: {
            user: getEnvVariable('MAILER_USER'),
            pass: getEnvVariable('MAILER_PASS')
        }
    },
    EMAIL: getEnvVariable('EMAIL'),
};

export default config;
