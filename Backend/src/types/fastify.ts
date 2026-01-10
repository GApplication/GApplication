/**
 * TypeScript Type Augmentation for Fastify
 *
 * This file extends the Fastify module types to add custom properties and configurations.
 * TypeScript's module augmentation allows us to add new properties to existing types
 * without modifying the original library files.
 */

import type { DataSource } from 'typeorm';

type HistoryTag = 'ACCOUNT_SIGNIN' | 'ACCOUNT_SIGNOUT' | 'ACCOUNT_PASSWORD' | 'ACCOUNT_SESSION_DELETE';

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

        history(tag: HistoryTag, ip: string, value1?: string | number, value2?: string | number, value3?: string | number, value4?: string | number): void;
    }
}
