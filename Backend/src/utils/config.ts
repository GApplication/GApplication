/**
 * Configuration Module
 *
 * This file loads and validates all environment variables needed by the application.
 * It provides type-safe access to configuration with automatic validation.
 *
 * Environment variables are defined in a .env file and must be set before the app starts.
 * Using dotenv/config to automatically load from .env file.
 */

import 'dotenv/config';

/**
 * Builder function factory - validates and converts environment variables
 *
 * This function implements the "builder pattern" to:
 * 1. Check if the environment variable exists (throw error if missing)
 * 2. Provide methods to convert the string value to the desired type
 * 3. Validate the converted value
 *
 * @param name - Name of the environment variable to load
 * @returns Object with methods to convert the value (asNumber, asString, asBoolean, asDuration)
 */
const builder = (name: string) =>
{
    const value = process.env[name];

    if (value === undefined)
    {
        throw new TypeError(`Missing required environment variable: ${ name }`);
    }

    const asNumber = () =>
    {
        const result = Number.parseInt(value, 10);

        if (Number.isNaN(result) || !Number.isFinite(result))
        {
            throw new TypeError(`Invalid value for environment variable: ${ name } - ${ typeof value } - ${ value }`);
        }

        return result;
    };

    const asString = () =>
    {
        return value;
    };

    const asBoolean = () =>
    {
        if (value === 'true')
        {
            return true;
        }

        if (value === 'false')
        {
            return false;
        }

        throw new TypeError(`Invalid value for environment variable: ${ name } - ${ typeof value } - ${ value }`);
    };

    function asDuration()
    {
        if (typeof value !== 'string')
        {
            throw new TypeError(`Invalid value for environment variable: ${ name } - ${ typeof value } - ${ value }`);
        }

        const match = value.trim().toLowerCase().match(/^(\d+)([dhms])$/);

        if (match === null)
        {
            throw new TypeError(`Invalid format for environment variable: ${ name } - 1s 60m 24h 30d - ${ value }`);
        }

        const multipliers: Record<string, number> = { s: 1000, m: 60000, h: 3600000, d: 86400000 };

        if (!(match[2] in multipliers))
        {
            throw new TypeError(`Invalid format type for environment variable: ${ name } - s m h d - ${ value }`);
        }

        return Number.parseInt(match[1], 10) * multipliers[match[2]];
    }

    return { asNumber, asString, asBoolean, asDuration };
};

const NODE_ENV = builder('NODE_ENV').asString();
const NODE_PORT = builder('NODE_PORT').asNumber();
const NODE_HOST = builder('NODE_HOST').asString();
const NODE_COOKIE = builder('NODE_COOKIE').asString();

const NODE_DB_TYPE = builder('NODE_DB_TYPE').asString();
const NODE_DB_HOST = builder('NODE_DB_HOST').asString();
const NODE_DB_PORT = builder('NODE_DB_PORT').asNumber();
const NODE_DB_USERNAME = builder('NODE_DB_USERNAME').asString();
const NODE_DB_PASSWORD = builder('NODE_DB_PASSWORD').asString();
const NODE_DB_DATABASE = builder('NODE_DB_DATABASE').asString();
const NODE_DB_SYNC = builder('NODE_DB_SYNC').asBoolean();
const NODE_DB_LOG = builder('NODE_DB_LOG').asBoolean();

const NODE_SESSION_ACCESS_TIME = builder('NODE_SESSION_ACCESS_TIME').asDuration();
const NODE_SESSION_ACCESS_SECRET = builder('NODE_SESSION_ACCESS_SECRET').asString();
const NODE_SESSION_REFRESH_TIME = builder('NODE_SESSION_REFRESH_TIME').asDuration();
const NODE_SESSION_REFRESH_SECRET = builder('NODE_SESSION_REFRESH_SECRET').asString();

export default
{
    NODE_ENV,
    NODE_PORT,
    NODE_HOST,
    NODE_COOKIE,

    NODE_DB_TYPE,
    NODE_DB_HOST,
    NODE_DB_PORT,
    NODE_DB_USERNAME,
    NODE_DB_PASSWORD,
    NODE_DB_DATABASE,
    NODE_DB_SYNC,
    NODE_DB_LOG,

    NODE_SESSION_ACCESS_TIME,
    NODE_SESSION_ACCESS_SECRET,
    NODE_SESSION_REFRESH_TIME,
    NODE_SESSION_REFRESH_SECRET
};
