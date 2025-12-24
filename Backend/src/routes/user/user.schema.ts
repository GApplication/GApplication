import { Type, Static } from 'typebox';

export const userBody = Type.Object({
    arch: Type.String({ minLength: 1, maxLength: 64 }),
    family: Type.String({ minLength: 1, maxLength: 64 }),
    hostname: Type.String({ minLength: 1, maxLength: 64 }),
    locale: Type.String({ minLength: 1, maxLength: 64 }),
    platform: Type.String({ minLength: 1, maxLength: 64 }),
    type: Type.String({ minLength: 1, maxLength: 64 }),
    version: Type.String({ minLength: 1, maxLength: 64 })
});

export const userResponse = Type.Object({ result: Type.Integer({ minimum: 0, maximum: 1 }) });

export type UserBody = Static<typeof userBody>;
export type UserResponse = Static<typeof userResponse>;
