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
 * @returns Object with methods to convert the value (asNumber, asString, asBoolean)
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

    return { asNumber, asString, asBoolean };
};

export default
{
    NODE_ENV: builder('NODE_ENV').asString(),
    NODE_PORT: builder('NODE_PORT').asNumber(),
    NODE_HOST: builder('NODE_HOST').asString(),

    NODE_DB_TYPE: builder('NODE_DB_TYPE').asString(),
    NODE_DB_HOST: builder('NODE_DB_HOST').asString(),
    NODE_DB_PORT: builder('NODE_DB_PORT').asNumber(),
    NODE_DB_USERNAME: builder('NODE_DB_USERNAME').asString(),
    NODE_DB_PASSWORD: builder('NODE_DB_PASSWORD').asString(),
    NODE_DB_DATABASE: builder('NODE_DB_DATABASE').asString(),
    NODE_DB_SYNC: builder('NODE_DB_SYNC').asBoolean(),
    NODE_DB_LOG: builder('NODE_DB_LOG').asBoolean()
};
