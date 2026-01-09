import type { FastifyRequest, FastifyReply } from 'fastify';

import { createHmac, timingSafeEqual } from 'node:crypto';

import fastifyPlugin from 'fastify-plugin';

import config from '../utils/config';
import status from '../utils/status';

function verifyAccessToken(token: string)
{
    const bearer = token.split(' ');

    if (bearer.length !== 2)
    {
        return;
    }

    const accessToken = bearer[1].split('.');

    if (accessToken.length !== 2)
    {
        return;
    }

    const payload = Buffer.from(accessToken[0], 'base64url');
    const signature = Buffer.from(accessToken[1], 'base64url');

    const signatureServer = createHmac('sha256', config.NODE_SESSION_ACCESS_SECRET).update(accessToken[0]).digest();

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
    const bearer = token.split(' ');

    if (bearer.length !== 2)
    {
        return;
    }

    const accessToken = bearer[1].split('.');

    if (accessToken.length !== 2)
    {
        return;
    }

    const payload = Buffer.from(accessToken[0], 'base64url');
    const signature = Buffer.from(accessToken[1], 'base64url');

    const signatureServer = createHmac('sha256', config.NODE_SESSION_ACCESS_SECRET).update(accessToken[0]).digest();

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

export function authentication()
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
            const payload = verifyAccessToken(accessToken);

            if (payload)
            {
                request.account_id = payload;

                return;
            }
        }

        reply.status(status.UNAUTHORIZED).send();
    });
});
