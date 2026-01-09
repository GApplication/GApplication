import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { Type, Static } from 'typebox';

import { rateLimit } from '../../plugins/ratelimit';
import { createRefreshToken, createAccessToken, authentication, verifyRefreshToken } from '../../plugins/authentication';

import config from '../../utils/config';
import status from '../../utils/status';

import { Account, AccountSession } from './account.entity';

export function signUp(fastify: FastifyInstance)
{
    const body = Type.Object({
        fname: Type.Optional(Type.String({ minLength: 1, maxLength: 64 })),
        lname: Type.Optional(Type.String({ minLength: 1, maxLength: 64 })),
        email: Type.String({ minLength: 5, maxLength: 256, format: 'email' }),
        password: Type.String({ minLength: 5, maxLength: 64 })
    });

    const schema = { body, response: { 200: Type.Null(), 409: Type.Null() } };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply) =>
    {
        if (await fastify.db.getRepository(Account).findOneBy({ email: request.body.email.toLowerCase() }))
        {
            reply.status(status.CONFLICT).send();

            return;
        }

        await fastify.db.getRepository(Account).save({ ...request.body, email: request.body.email.toLowerCase() });

        reply.status(status.CREATED).send();
    };

    // 5x per day
    return [ { schema, ...rateLimit('account-sign-up', 5, 24 * 60 * 60 * 1000) }, handler ] as const;
}

export function signIn(fastify: FastifyInstance)
{
    const body = Type.Object({ email: Type.String({ minLength: 5, maxLength: 256, format: 'email' }), password: Type.String({ minLength: 5, maxLength: 64 }) });

    const response200 = Type.Object({ accessToken: Type.String() });

    const schema = { body, response: { 200: response200, 401: Type.Null() } };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply) =>
    {
        const account = await fastify.db.getRepository(Account).findOneBy({ email: request.body.email.toLowerCase(), password: request.body.password });

        if (account === null)
        {
            reply.status(status.UNAUTHORIZED).send();

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

        return { accessToken };
    };

    // 10x per hour
    return [ { schema, ...rateLimit('account-sign-in', 10, 60 * 60 * 1000) }, handler ] as const;
}

export function signOut(fastify: FastifyInstance)
{
    const schema = { response: { 200: Type.Null(), 401: Type.Null() } };

    const handler = async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const refreshToken = request.cookies['refresh'];

        if (refreshToken === undefined)
        {
            reply.status(status.UNAUTHORIZED).send();

            return;
        }

        const accountSession = await fastify.db.getRepository(AccountSession).findOneBy({ token: refreshToken, revoked_at: 0 });

        if (accountSession === null)
        {
            reply.status(status.UNAUTHORIZED).send();

            return;
        }

        accountSession.revoked_at = Date.now() / 1000;

        await fastify.db.getRepository(AccountSession).save(accountSession);

        reply.send();
    };

    // 10x per hour
    return [ { schema, ...rateLimit('account-sign-out', 10, 60 * 60 * 1000), ...authentication() }, handler ] as const;
}

export function forgot(fastify: FastifyInstance)
{
    const body = Type.Object({ email: Type.String({ minLength: 5, maxLength: 256, format: 'email' }) });

    const schema = { body, response: { 200: Type.Null(), 404: Type.Null() } };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply) =>
    {
        const account = await fastify.db.getRepository(Account).findOneBy({ email: request.body.email.toLowerCase() });

        if (account === null)
        {
            reply.status(status.NOT_FOUND).send();

            return;
        }

        reply.send();
    };

    // 8x per hour
    return [ { schema, ...rateLimit('account-forgot', 8, 60 * 60 * 1000) }, handler ] as const;
}

export function password(fastify: FastifyInstance)
{
    const body = Type.Object({ passwordold: Type.String({ minLength: 5, maxLength: 64 }), passwordnew: Type.String({ minLength: 5, maxLength: 64 }) });

    const schema = { body, response: { 200: Type.Null(), 404: Type.Null() } };

    const handler = async(request: FastifyRequest<{ Body: Static<typeof body> }>, reply: FastifyReply) =>
    {
        const account = await fastify.db.getRepository(Account).findOneBy({ id: request.account_id, password: request.body.passwordold });

        if (account === null)
        {
            reply.status(status.NOT_FOUND).send();

            return;
        }

        account.password = request.body.passwordnew;

        await fastify.db.getRepository(Account).save(account);

        reply.send();
    };

    // 30x per hour
    return [ { schema, ...rateLimit('account-password', 30, 60 * 60 * 1000), ...authentication() }, handler ] as const;
}

export function refresh(fastify: FastifyInstance)
{
    const response200 = Type.Object({ accessToken: Type.String() });

    const schema = { response: { 200: response200, 401: Type.Null() } };

    const handler = async(request: FastifyRequest, reply: FastifyReply) =>
    {
        const refreshToken = request.cookies['refresh'];

        if (refreshToken === undefined)
        {
            reply.status(status.UNAUTHORIZED).send();

            return;
        }

        const accountId = verifyRefreshToken(refreshToken);

        if (accountId === undefined || accountId !== request.account_id)
        {
            reply.status(status.UNAUTHORIZED).send();

            return;
        }

        const accountSession = await fastify.db.getRepository(AccountSession).findOneBy({ account_id: request.account_id, token: refreshToken });

        if (accountSession === null || accountSession.revoked_at > 0)
        {
            reply.status(status.UNAUTHORIZED).send();

            return;
        }

        return { accessToken: createAccessToken(request.account_id) };
    };

    // 30x per hour
    return [ { schema, ...rateLimit('account-refresh', 30, 60 * 60 * 1000), ...authentication() }, handler ] as const;
}

export function sessionList(fastify: FastifyInstance)
{
    const query = Type.Object({ page: Type.Integer({ minimum: 1, default: 1 }), limit: Type.Integer({ minimum: 1, maximum: 30, default: 10 }) });

    const response200 = Type.Object({
        total: Type.Integer(),
        items: Type.Array(Type.Object({
            id: Type.Number(),
            device: Type.String(),
            expiresAt: Type.Number(),
            createdAt: Type.Number()
        }))
    });

    const schema = { querystring: query, response: { 200: response200 } };

    const handler = async(request: FastifyRequest<{ Querystring: Static<typeof query> }>) =>
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

        return { total, items: items.map((s) => ({ id: s.id, device: s.device, expiresAt: s.expires_at, createdAt: s.created_at })) };
    };

    // 100x per hour
    return [ { schema, ...rateLimit('account-session', 100, 60 * 60 * 1000), ...authentication() }, handler ] as const;
}

export function sessionDelete(fastify: FastifyInstance)
{
    const query = Type.Object({ id: Type.Integer({ minimum: 1 }) });

    const schema = { querystring: query, response: { 200: Type.Null(), 404: Type.Null() } };

    const handler = async(request: FastifyRequest<{ Querystring: Static<typeof query> }>, reply: FastifyReply) =>
    {
        const session = await fastify.db.getRepository(AccountSession).findOneBy({ id: request.query.id, account_id: request.account_id, revoked_at: 0 });

        if (session === null)
        {
            reply.status(status.NOT_FOUND).send();

            return;
        }

        session.revoked_at = Date.now() / 1000;

        await fastify.db.getRepository(AccountSession).save(session);

        reply.send();
    };

    // 30x per hour
    return [ { schema, ...rateLimit('account-session', 30, 60 * 60 * 1000), ...authentication() }, handler ] as const;
}
