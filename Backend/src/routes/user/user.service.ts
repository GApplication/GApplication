import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { rateLimit } from '../../plugins/ratelimit';

import { User } from './user.entity';
import { userBody, userResponse, type UserBody, UserResponse } from './user.schema';

export function userOnline(fastify: FastifyInstance)
{
    const schema = { body: userBody, response: { 200: userResponse } };

    const handler = async(request: FastifyRequest<{ Body: UserBody }>, reply: FastifyReply<{ Reply: UserResponse }>) =>
    {
        const body = request.body;

        await fastify.db.getRepository(User).save({ ip: request.ip, ...body });

        return reply.send({ result: 0 });
    };

    return [ { schema, ...rateLimit('user-online', 2, 600000) }, handler ] as const;
}
