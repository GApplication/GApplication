import 'reflect-metadata';

import type { FastifyError } from 'fastify';

import path from 'node:path';

import fastify from 'fastify';
import swagger from '@fastify/swagger';
import autoLoad from '@fastify/autoload';
import swaggerUI from '@fastify/swagger-ui';

import config from './utils/config';
import typeorm from './plugins/typeorm';
import ratelimit from './plugins/ratelimit';

const main = async() =>
{
    const app = fastify({ logger: config.NODE_ENV === 'development' && { level: 'trace', timestamp: false, base: { } }, trustProxy: true });

    app.setErrorHandler((error: FastifyError, _request, reply) =>
    {
        if (error.validation)
        {
            reply.status(400).send({ error: 'Bad Request', message: error.validation[0]?.message ?? 'Validation Error' });

            return;
        }

        reply.status(500).send({ error: 'Internal Error', message: error.message });
    });

    if (config.NODE_ENV === 'development')
    {
        await app.register(swagger, { openapi: { info: { title: 'API', version: '1.0.0' }, servers: [ { url: `http://localhost:${ config.NODE_PORT }` } ] } });

        await app.register(swaggerUI, { routePrefix: '/api' });
    }

    await app.register(ratelimit);

    await app.register(typeorm, { dir: path.join(import.meta.dirname, 'routes'), matchFilter: '**/*.entity.{ts,js}' });

    await app.register(autoLoad, { dir: path.join(import.meta.dirname, 'routes'), matchFilter: /\.route\.(ts|js)$/, dirNameRoutePrefix: false });

    try
    {
        await app.listen({ port: config.NODE_PORT, host: config.NODE_HOST });
    }
    catch (error)
    {
        app.log.error(error);

        process.exit(1);
    }

    if (config.NODE_ENV === 'development')
    {
        app.log.error(`Swagger UI available at http://localhost:${ config.NODE_PORT }/api`);
    }
};

void main();
