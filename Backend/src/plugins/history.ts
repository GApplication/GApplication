import type { FastifyInstance } from 'fastify';

import fastifyPlugin from 'fastify-plugin';

import { AccountHistory } from '../routes/account/account.entity';

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
     */
    fastify.decorate('history', async(tag: string, ip: string, value1?: string | number, value2?: string | number, value3?: string | number, value4?: string | number) =>
    {
        try
        {
            const record = { tag, ip } as { tag: string; ip: string; value1?: string; value2?: string; value3?: string; value4?: string };

            if (value1)
            {
                record['value1'] = `${ value1 }`;
            }

            if (value2)
            {
                record['value2'] = `${ value2 }`;
            }

            if (value3)
            {
                record['value3'] = `${ value3 }`;
            }

            if (value4)
            {
                record['value4'] = `${ value4 }`;
            }

            void fastify.db.getRepository(AccountHistory).save(record);
        }
        catch (error)
        {
            fastify.log.error(error);
        }
    });
});
