import { load } from '@tauri-apps/plugin-store';

const Seed = 'GApp.Internal.Seed.2025';
const Salt = 'GApp.Internal.Salt.2025';

const Storage = await load('application.bin');

const TextEncoderInstance = new TextEncoder();
const TextDecoderInstance = new TextDecoder();

const GetCryptoKey = async() =>
{
    const BaseKey = await crypto.subtle.importKey('raw', TextEncoderInstance.encode(Seed), 'PBKDF2', false, [ 'deriveKey' ]);

    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: TextEncoderInstance.encode(Salt), iterations: 100_000, hash: 'SHA-256' }, BaseKey, { name: 'AES-GCM', length: 256 }, false, [ 'encrypt', 'decrypt' ]);
};

const Encrypt = async(Message: string) =>
{
    const Key = await GetCryptoKey();
    const IV = crypto.getRandomValues(new Uint8Array(12));

    const CipherText = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: IV }, Key, TextEncoderInstance.encode(Message));

    return { IV: [ ...IV ], Data: [ ...new Uint8Array(CipherText) ] };
};

const Decrypt = async(Payload: { IV: number[]; Data: number[] }) =>
{
    const Key = await GetCryptoKey();

    const PlainBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(Payload.IV) }, Key, new Uint8Array(Payload.Data));

    return TextDecoderInstance.decode(PlainBuffer);
};

export const SetValue = async(Key: StorageKey, Value: string) =>
{
    await Storage.set(Key, Value);

    await Storage.save();
};

export const SetValueSafe = async(Key: StorageKey, Value: string) =>
{
    const Encrypted = await Encrypt(Value);

    await Storage.set(Key, Encrypted);
    await Storage.save();
};

export const GetValue = async(Key: StorageKey) =>
{
    return await Storage.get<string>(Key);
};

export const GetValueSafe = async(Key: StorageKey) =>
{
    const Encrypted = await Storage.get<{ IV: number[]; Data: number[] }>(Key);

    if (Encrypted === undefined)
    {
        return;
    }

    return await Decrypt(Encrypted);
};

export default { SetValue, SetValueSafe, GetValueSafe, GetValue };
