/**
 * TypeScript Type Augmentation for Fastify
 *
 * This file extends the Fastify module types to add custom properties and configurations.
 * TypeScript's module augmentation allows us to add new properties to existing types
 * without modifying the original library files.
 */

import type { DataSource } from 'typeorm';

declare module 'fastify'
{
    interface FastifyContextConfig
    {
        authentication?: boolean;

        rateLimit?:
        {
            name: string;
            count: number;
            time: number;
        };
    }

    interface FastifyRequest
    {
        account_id: number;
    }

    interface FastifyInstance
    {
        db: DataSource;

        config:
        {
            rateLimit?:
            {
                name: string;
                count: number;
                time: number;
            };
        };

        history(tag: string, ip: string, value1?: string, value2?: string, value3?: string, value4?: string): Promise<void>;
    }
}
