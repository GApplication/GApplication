/**
 * Main entry point for the Wallet Backend API server
 *
 * This file initializes the Fastify server and registers all necessary plugins:
 * - reflect-metadata: Required for TypeORM decorators to work
 * - swagger: Generates OpenAPI documentation
 * - swaggerUI: Provides interactive API documentation UI
 * - autoLoad: Automatically loads and registers route files
 * - typeorm: Initializes database connection
 * - ratelimit: Implements rate limiting for endpoints
 */

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

import './types/fastify';

const main = async() =>
{
    // Initialize Fastify with configuration
    // - logger: Only log in development mode with trace level
    // - trustProxy: Trust the proxy headers (important for getting real client IP)
    const app = fastify({ logger: config.NODE_ENV === 'development' && { level: 'trace', timestamp: false, base: { } }, trustProxy: true });

    /**
     * Global error handler for all routes
     * Catches validation errors and general errors, returning appropriate HTTP status codes
     */
    app.setErrorHandler((error: FastifyError, _request, reply) =>
    {
        // Return 400 Bad Request for validation errors with the first validation message
        if (error.validation)
        {
            reply.status(400).send({ error: 'Bad Request', message: error.validation[0]?.message ?? 'Validation Error' });

            return;
        }

        // Return 500 Internal Server Error for all other errors
        reply.status(500).send({ error: 'Internal Error', message: error.message });
    });

    /**
     * Register Swagger documentation plugins in development environment
     * This allows interactive API documentation at /api route
     */
    if (config.NODE_ENV === 'development')
    {
        await app.register(swagger, { openapi: { info: { title: 'API', version: '1.0.0' }, servers: [ { url: `http://localhost:${ config.NODE_PORT }` } ] } });

        await app.register(swaggerUI, { routePrefix: '/api' });
    }

    /**
     * Register rate limiting plugin
     * Prevents abuse by limiting request frequency per IP address
     */
    await app.register(ratelimit);

    /**
     * Register TypeORM database plugin
     * Scans the routes directory for entity files (*.entity.ts) and initializes database connection
     */
    await app.register(typeorm, { dir: path.join(import.meta.dirname, 'routes'), matchFilter: '**/*.entity.{ts,js}' });

    /**
     * Auto-register all route files (*.route.ts) from the routes directory
     * Routes are registered without directory prefix (e.g., /user/online, not /user/user/online)
     */
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

    /**
     * In development mode, log the Swagger UI URL for easy access
     */
    if (config.NODE_ENV === 'development')
    {
        app.log.error(`Swagger UI available at http://localhost:${ config.NODE_PORT }/api`);
    }
};

void main();
