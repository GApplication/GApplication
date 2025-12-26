/**
 * TypeORM Database Plugin
 *
 * This plugin initializes the TypeORM DataSource and decorates the Fastify instance
 * with a `db` property, making the database connection available to all routes.
 *
 * The plugin automatically discovers entity files and initializes the database connection
 * on server startup, and properly cleans up the connection on server shutdown.
 */

import type { FastifyInstance } from 'fastify';

import path from 'node:path';

import fastifyPlugin from 'fastify-plugin';

import { DataSource } from 'typeorm';

import config from '../utils/config';

/**
 * TypeORM plugin exported as a Fastify plugin
 *
 * fastifyPlugin wrapper ensures this plugin runs as a separate plugin with proper
 * lifecycle management (all child routes/plugins can access the decorated db property)
 *
 * @param options.dir - Base directory where entity files are located (routes folder)
 * @param options.matchFilter - Pattern to match entity files (e.g., **\/*.entity.{ts,js})
 */
export default fastifyPlugin(async function(fastify: FastifyInstance, options: { dir: string; matchFilter: string })
{
    const dataSource = new DataSource({
        // @ts-expect-error Silent Error - type from env Database type (mysql, postgres, sqlite, etc.)
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
