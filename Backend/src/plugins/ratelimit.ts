/**
 * Rate Limiting Plugin
 *
 * This plugin implements a simple in-memory rate limiting mechanism to protect
 * API endpoints from abuse by restricting the number of requests per IP address.
 *
 * The rate limit configuration is defined per-route using the rateLimit() helper function,
 * and the plugin enforces these limits on the preHandler hook (before the route handler executes).
 */

import type { FastifyRequest, FastifyReply } from 'fastify';

import fastifyPlugin from 'fastify-plugin';

const rateLimitMap = new Map<string, { count: number; time: number }>();

/**
 * Helper function to define rate limit configuration for a route
 *
 * @param name - Unique identifier for this rate limit (e.g., 'user-online')
 * @param count - Maximum number of requests allowed in the time window
 * @param time - Time window in milliseconds
 * @returns Configuration object to spread into route schema
 *
 * @example
 * // Limit /user/online to 2 requests per 10 minutes per IP
 * rateLimit('user-online', 2, 600000)
 */
export function rateLimit(name: string, count: number, time: number)
{
    return { config: { rateLimit: { name, count, time } } };
}

export default fastifyPlugin(async function(fastify)
{
    /**
     * Register a preHandler hook that runs before every request
     * This hook checks if the client has exceeded their rate limit
     */
    fastify.addHook('preHandler', async(request: FastifyRequest, reply: FastifyReply) =>
    {
        /**
         * Get the rate limit configuration for this specific route
         * Only configured routes have rate limiting enabled
         */
        const routeConfig = request.routeOptions.config?.rateLimit;

        if (routeConfig === undefined)
        {
            return;
        }

        const now = Math.floor(Date.now() / 1000);
        const key = `${ request.ip }:${ routeConfig.name }`;

        let record = rateLimitMap.get(key);

        if (record === undefined || record.time < now)
        {
            record = { count: routeConfig.count, time: routeConfig.time + now };

            rateLimitMap.set(key, record);
        }

        reply.header('X-RateLimit-Limit', routeConfig.count);
        reply.header('X-RateLimit-Reset', now);

        if (record.count == 0)
        {
            reply.header('X-RateLimit-Remaining', 0);

            return reply.code(429).send();
        }

        record.count -= 1;

        reply.header('X-RateLimit-Remaining', record.count);
    });
});
