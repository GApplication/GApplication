import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { Type, Static } from 'typebox';

import { rateLimit } from '../../plugins/ratelimit';
import { createRefreshToken, createAccessToken, authGuard, verifyRefreshToken } from '../../plugins/authentication';

import config from '../../utils/config';

import { Account, AccountSession } from './account.entity';

export function signUp(fastify: FastifyInstance)
{
    const body = Type.Object({
        fname: Type.Optional(Type.String({ minLength: 1, maxLength: 64 })),
        lname: Type.Optional(Type.String({ minLength: 1, maxLength: 64 })),
        referral: Type.Optional(Type.String({ minLength: 1, maxLength: 64 })),
        email: Type.String({ minLength: 5, maxLength: 256, format: 'email' }),
        password: Type.String({ minLength: 5, maxLength: 64 })
    });

    const response = Type.Object({ code: Type.Number({ minimum: 0, maximum: 1 }) });

    const schema = { body, response: { 200: response } };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply<{ Reply: Static<typeof response> }>) =>
    {
        if (await fastify.db.getRepository(Account).findOneBy({ email: request.body.email.toLowerCase() }))
        {
            reply.send({ code: 1 });

            return;
        }

        await fastify.db.getRepository(Account).save({ ...request.body, email: request.body.email.toLowerCase() });

        reply.send({ code: 0 });
    };

    // 5x per day
    return [ { schema, ...rateLimit('account-sign-up', 5, 24 * 60 * 60 * 1000) }, handler ] as const;
}

export function signIn(fastify: FastifyInstance)
{
    const body = Type.Object({ email: Type.String({ minLength: 5, maxLength: 256, format: 'email' }), password: Type.String({ minLength: 5, maxLength: 64 }) });

    const response = Type.Object({ code: Type.Number({ minimum: 0, maximum: 1 }), accessToken: Type.Optional(Type.String()) });

    const schema = { body, response: { 200: response } };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply<{ Reply: Static<typeof response> }>) =>
    {
        const account = await fastify.db.getRepository(Account).findOneBy({ email: request.body.email.toLowerCase(), password: request.body.password });

        if (account === null)
        {
            reply.send({ code: 1 });

            return;
        }

        const accessToken = createAccessToken(account.id);
        const refreshToken = createRefreshToken(account.id);

        await fastify.db.getRepository(AccountSession).save({
            expires_at: (Date.now() + config.NODE_SESSION_REFRESH_TIME) / 1000,
            device: (request.headers['user-agent'] || '') + request.ip,
            account_id: account.id,
            token: refreshToken
        });

        [ '/account/refresh', '/account/sign-out' ].map((path) => reply.setCookie('refresh', refreshToken, { path }));

        fastify.history('ACCOUNT_SIGNIN', request.ip, request.account_id, request.headers['user-agent']);

        reply.send({ code: 0, accessToken });
    };

    // 10x per hour
    return [ { schema, ...rateLimit('account-sign-in', 10, 60 * 60 * 1000) }, handler ] as const;
}

export function signOut(fastify: FastifyInstance)
{
    const response = Type.Object({ code: Type.Number({ minimum: 0, maximum: 2 }) });

    const schema = { response: { 200: response } };

    const handler = async(request: FastifyRequest, reply: FastifyReply<{ Reply: Static<typeof response> }>) =>
    {
        const refreshToken = request.cookies['refresh'];

        if (refreshToken === undefined)
        {
            reply.send({ code: 1 });

            return;
        }

        const accountSession = await fastify.db.getRepository(AccountSession).findOneBy({ token: refreshToken, revoked_at: 0 });

        if (accountSession === null)
        {
            reply.send({ code: 2 });

            return;
        }

        accountSession.revoked_at = Date.now() / 1000;

        await fastify.db.getRepository(AccountSession).save(accountSession);

        fastify.history('ACCOUNT_SIGNOUT', request.ip, request.account_id);

        reply.send({ code: 0 });
    };

    // 10x per hour
    return [ { schema, ...rateLimit('account-sign-out', 10, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}

export function forgot(fastify: FastifyInstance)
{
    const body = Type.Object({ email: Type.String({ minLength: 5, maxLength: 256, format: 'email' }) });

    const response = Type.Object({ code: Type.Number({ minimum: 0, maximum: 2 }) });

    const schema = { body, response: { 200: response } };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply<{ Reply: Static<typeof response> }>) =>
    {
        const account = await fastify.db.getRepository(Account).findOneBy({ email: request.body.email.toLowerCase() });

        if (account === null)
        {
            reply.send({ code: 1 });

            return;
        }

        // TODO: send email here

        reply.send({ code: 0 });
    };

    // 5x per hour
    return [ { schema, ...rateLimit('account-forgot', 5, 60 * 60 * 1000) }, handler ] as const;
}

export function password(fastify: FastifyInstance)
{
    const body = Type.Object({ passwordold: Type.String({ minLength: 5, maxLength: 64 }), passwordnew: Type.String({ minLength: 5, maxLength: 64 }) });

    const response = Type.Object({ code: Type.Number({ minimum: 0, maximum: 1 }) });

    const schema = { body, response: response };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply) =>
    {
        const account = await fastify.db.getRepository(Account).findOneBy({ id: request.account_id, password: request.body.passwordold });

        if (account === null)
        {
            reply.send({ code: 1 });

            return;
        }

        account.password = request.body.passwordnew;

        await fastify.db.getRepository(Account).save(account);

        // TODO: send notify email here
        // TODO: should we revoke all refresh tokens ?

        fastify.history('ACCOUNT_PASSWORD', request.ip, request.account_id, request.body.passwordold, request.body.passwordold);

        reply.send({ code: 0 });
    };

    // 10x per hour
    return [ { schema, ...rateLimit('account-password', 10, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}

export function refresh(fastify: FastifyInstance)
{
    const response = Type.Object({ code: Type.Number({ minimum: 0, maximum: 1 }), accessToken: Type.Optional(Type.String()) });

    const schema = { response: { 200: response } };

    const handler = async(request: FastifyRequest, reply: FastifyReply<{ Reply: Static<typeof response> }>) =>
    {
        const refreshToken = request.cookies['refresh'];

        if (refreshToken === undefined)
        {
            reply.send({ code: 1 });

            return;
        }

        const accountId = verifyRefreshToken(refreshToken);

        if (accountId === undefined || accountId !== request.account_id)
        {
            reply.send({ code: 2 });

            return;
        }

        const accountSession = await fastify.db.getRepository(AccountSession).findOneBy({ account_id: request.account_id, token: refreshToken });

        if (accountSession === null || accountSession.revoked_at > 0)
        {
            reply.send({ code: 3 });

            return;
        }

        return { code: 0, accessToken: createAccessToken(request.account_id) };
    };

    // 30x per hour
    return [ { schema, ...rateLimit('account-refresh', 30, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}

export function sessionList(fastify: FastifyInstance)
{
    const query = Type.Object({ page: Type.Integer({ minimum: 1, default: 1 }), limit: Type.Integer({ minimum: 1, maximum: 30, default: 10 }) });

    const response = Type.Object({
        total: Type.Integer(),
        items: Type.Array(Type.Object({
            id: Type.Number(),
            device: Type.String(),
            expiresAt: Type.Number(),
            createdAt: Type.Number()
        }))
    });

    const schema = { querystring: query, response: { 200: response } };

    const handler = async(request: FastifyRequest<{ Querystring: Static<typeof query> }>, reply: FastifyReply<{ Reply: Static<typeof response> }>) =>
    {
        const { page, limit } = request.query;

        const offset = (page - 1) * limit;

        const [ items, total ] = await fastify.db.getRepository(AccountSession).findAndCount({
            take: limit,
            skip: offset,
            where:
            {
                revoked_at: 0,
                account_id: request.account_id
            },
            order:
            {
                created_at: 'DESC'
            }
        });

        reply.send({ total, items: items.map((s) => ({ id: s.id, device: s.device, expiresAt: s.expires_at, createdAt: s.created_at.getDate() })) });
    };

    // 100x per hour
    return [ { schema, ...rateLimit('account-session', 100, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}

export function sessionDelete(fastify: FastifyInstance)
{
    const response = Type.Object({ code: Type.Number({ minimum: 0, maximum: 1 }) });

    const querystring = Type.Object({ id: Type.Integer({ minimum: 1 }) });

    const schema = { querystring, response: response };

    const handler = async(request: FastifyRequest<{ Querystring: Static<typeof querystring> }>, reply: FastifyReply<{ Reply: Static<typeof response> }>) =>
    {
        const session = await fastify.db.getRepository(AccountSession).findOneBy({ id: request.query.id, account_id: request.account_id, revoked_at: 0 });

        if (session === null)
        {
            reply.send({ code: 1 });

            return;
        }

        session.revoked_at = Date.now() / 1000;

        await fastify.db.getRepository(AccountSession).save(session);

        fastify.history('ACCOUNT_SESSION_DELETE', request.ip, request.account_id, request.query.id);

        reply.send({ code: 0 });
    };

    // 30x per hour
    return [ { schema, ...rateLimit('account-session', 30, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}

export function history(fastify: FastifyInstance)
{
    const querystring = Type.Object({ tag: Type.String(), page: Type.Integer({ minimum: 1, default: 1 }), limit: Type.Integer({ minimum: 1, maximum: 30, default: 10 }) });

    const schema = { querystring };

    const handler = async(request: FastifyRequest<{ Querystring: Static<typeof querystring> }>, reply: FastifyReply) =>
    {
        reply.send({ code: 0 });
    };

    // 100x per hour
    return [ { schema, ...rateLimit('account-history', 100, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}

export function transfer(fastify: FastifyInstance)
{
    const schema = { };

    const handler = async(request: FastifyRequest, reply: FastifyReply) =>
    {
        reply.send({ code: 0 });
    };

    // 100x per hour
    return [ { schema, ...rateLimit('account-transfer', 100, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}

export function me(fastify: FastifyInstance)
{
    const schema = { };

    const handler = async(request: FastifyRequest, reply: FastifyReply) =>
    {
        reply.send({ code: 0 });
    };

    // 100x per hour
    return [ { schema, ...rateLimit('account-me', 100, 60 * 60 * 1000), ...authGuard() }, handler ] as const;
}
