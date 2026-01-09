import type { FastifyInstance } from 'fastify';

import fastifyPlugin from 'fastify-plugin';

import { AccountHistory } from '../routes/account/account.entity';

export type HistoryTag = 'ACCOUNT_PASSWORD' | 'ACCOUNT_EMAIL' | 'ACCOUNT_LOGIN' | 'ACCOUNT_LOGOUT' | 'ACCOUNT_REGISTER' | 'ACCOUNT_DELETE' | 'API_KEY_CREATE' | 'API_KEY_REVOKE' | 'DATA_EXPORT' | 'DATA_IMPORT' | 'SETTINGS_UPDATE' | 'RATE_LIMIT_EXCEEDED';

export default fastifyPlugin(async function(fastify: FastifyInstance)
{
    /**
     * Decorate Fastify instance with a history method
     * Creates a history record with the provided tag, ip and values
     *
     * @param tag - Category or event name for the history entry
     * @param ip - Client ip address
     * @param value1 - First optional value (max 512 chars)
     * @param value2 - Second optional value (max 512 chars)
     * @param value3 - Third optional value (max 512 chars)
     * @param value4 - Fourth optional value (max 512 chars)
     *
     * @example
     * // In a route handler with request context
     * fastify.history('user-login', userId, 'success', null, null, request);
     */
    fastify.decorate('history', async(tag: HistoryTag, ip: string, value1?: string, value2?: string, value3?: string, value4?: string) =>
    {
        try
        {
            void fastify.db.getRepository(AccountHistory).save({ tag, ip, value1: value1 ?? null, value2: value2 ?? null, value3: value3 ?? null, value4: value4 ?? null });
        }
        catch (error)
        {
            fastify.log.error(error);
        }
    });
});
