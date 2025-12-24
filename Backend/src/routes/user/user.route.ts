import type { FastifyInstance } from 'fastify';

import { userOnline } from './user.service';

export default async function(fastify: FastifyInstance)
{
    fastify.post('/user/online', ...userOnline(fastify));
}
