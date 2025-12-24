import type { FastifyRequest, FastifyReply } from 'fastify';

import fastifyPlugin from 'fastify-plugin';

const rateLimitMap = new Map<string, { count: number; time: number }>();

export function rateLimit(name: string, count: number, time: number)
{
    return { config: { rateLimit: { name, count, time } } };
}

export default fastifyPlugin(async function(fastify)
{
    fastify.addHook('preHandler', async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const routeConfig = request.routeOptions.config?.rateLimit;

        if (routeConfig === undefined)
        {
            return;
        }

        const now = Date.now() / 1000;
        const key = `${ request.ip }:${ routeConfig.name }`;

        let record = rateLimitMap.get(key);

        if (record === undefined || record.time < now)
        {
            record = { count: routeConfig.count, time: routeConfig.time + now };

            rateLimitMap.set(key, record);
        }

        reply.header('X-RateLimit-Limit', routeConfig.count);
        reply.header('X-RateLimit-Reset', Math.floor(record.time));

        if (record.count == 0)
        {
            reply.header('X-RateLimit-Remaining', 0);

            return reply.code(429).send();
        }

        record.count -= 1;

        reply.header('X-RateLimit-Remaining', record.count);
    });
});
