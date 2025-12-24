import 'dotenv/config';

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
