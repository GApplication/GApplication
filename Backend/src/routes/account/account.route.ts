import type { FastifyInstance } from 'fastify';

import { signIn, signUp, forgot, password, signOut, refresh, sessionList, sessionDelete, history, me, transfer } from './account.service';

export default async function(fastify: FastifyInstance)
{
    fastify.post('/account/sign-in', ...signIn(fastify));
    fastify.post('/account/sign-up', ...signUp(fastify));
    fastify.post('/account/sign-out', ...signOut(fastify));
    fastify.post('/account/forgot', ...forgot(fastify));
    fastify.post('/account/password', ...password(fastify));
    fastify.post('/account/refresh', ...refresh(fastify));
    fastify.get('/account/session', ...sessionList(fastify));
    fastify.delete('/account/session', ...sessionDelete(fastify));
    fastify.get('/account/history', ...history(fastify));
    fastify.post('/account/transfer', ...transfer(fastify));
    fastify.get('/account/me', ...me(fastify));
}
