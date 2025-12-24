import type { DataSource } from 'typeorm';

declare module 'fastify'
{
    interface FastifyContextConfig
    {
        rateLimit?:
        {
            name: string;
            count: number;
            time: number;
        };
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
    }
}
