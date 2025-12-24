import type { FastifyInstance } from 'fastify';

import path from 'node:path';

import fastifyPlugin from 'fastify-plugin';

import { DataSource } from 'typeorm';

import config from '../utils/config';

export default fastifyPlugin(async function(fastify: FastifyInstance, options: { dir: string; matchFilter: string })
{
    const dataSource = new DataSource({
        // @ts-expect-error Silent Error
        type: config.NODE_DB_TYPE,
        host: config.NODE_DB_HOST,
        port: config.NODE_DB_PORT,
        username: config.NODE_DB_USERNAME,
        password: config.NODE_DB_PASSWORD,
        database: config.NODE_DB_DATABASE,
        synchronize: config.NODE_DB_SYNC,
        logging: config.NODE_DB_LOG,
        entities: [ path.join(options.dir, options.matchFilter) ]
    });

    await dataSource.initialize();

    fastify.decorate('db', dataSource);

    fastify.addHook('onClose', async() =>
    {
        await dataSource.destroy();
    });
});
