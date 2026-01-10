import type { FastifyRequest, FastifyReply } from 'fastify';

import { createHmac, timingSafeEqual } from 'node:crypto';

import fastifyPlugin from 'fastify-plugin';

import config from '../utils/config';

import { STATUS_UNAUTHORIZED } from '../utils/status';

export function verifyAccessToken(token: string)
{
    const accessToken = token.split('.');

    if (accessToken.length !== 2)
    {
        return;
    }

    const payload = Buffer.from(accessToken[0], 'base64url');
    const signature = Buffer.from(accessToken[1], 'base64url');

    const signatureServer = createHmac('sha512', config.NODE_SESSION_ACCESS_SECRET).update(accessToken[0]).digest();

    if (signatureServer.length !== signature.length || !timingSafeEqual(signatureServer, signature))
    {
        return;
    }

    const decoded = JSON.parse(payload.toString()) as { id: number; expires_at: number };

    if (decoded.expires_at * 1000 < Date.now())
    {
        return;
    }

    return decoded.id;
}

export function verifyRefreshToken(token: string)
{
    const accessToken = token.split('.');

    if (accessToken.length !== 2)
    {
        return;
    }

    const payload = Buffer.from(accessToken[0], 'base64url');
    const signature = Buffer.from(accessToken[1], 'base64url');

    const signatureServer = createHmac('sha512', config.NODE_SESSION_REFRESH_SECRET).update(accessToken[0]).digest();

    if (signatureServer.length !== signature.length || !timingSafeEqual(signatureServer, signature))
    {
        return;
    }

    const decoded = JSON.parse(payload.toString()) as { id: number; expires_at: number };

    if (decoded.expires_at * 1000 < Date.now())
    {
        return;
    }

    return decoded.id;
}

export function createAccessToken(id: number): string
{
    const payload = Buffer.from(JSON.stringify({ id, expires_at: (Date.now() + config.NODE_SESSION_ACCESS_TIME) / 1000 })).toString('base64url');

    const signature = createHmac('sha256', config.NODE_SESSION_ACCESS_SECRET).update(payload).digest('base64url');

    return `${ payload }.${ signature }`;
}

export function createRefreshToken(id: number): string
{
    const payload = Buffer.from(JSON.stringify({ id, expires_at: (Date.now() + config.NODE_SESSION_REFRESH_TIME) / 1000 })).toString('base64url');

    const signature = createHmac('sha256', config.NODE_SESSION_REFRESH_SECRET).update(payload).digest('base64url');

    return `${ payload }.${ signature }`;
}

export function authGuard()
{
    return { config: { authentication: true } };
}

export default fastifyPlugin(async function(fastify)
{
    fastify.addHook('preHandler', async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const routeConfig = request.routeOptions.config?.authentication;

        if (routeConfig === undefined)
        {
            return;
        }

        const accessToken = request.headers['authorization'];

        if (typeof accessToken === 'string')
        {
            const bearer = accessToken.split(' ');

            if (bearer.length !== 2)
            {
                return;
            }

            const payload = verifyAccessToken(bearer[1]);

            if (payload)
            {
                request.account_id = payload;

                return;
            }
        }

        reply.status(STATUS_UNAUTHORIZED).send();
    });
});
