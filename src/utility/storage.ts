import { load } from '@tauri-apps/plugin-store';

const Seed = 'GApp.Internal.Seed.2025';
const Salt = 'GApp.Internal.Salt.2025';

const Storage = await load('application.bin');

const TextEncoderInstance = new TextEncoder();
const TextDecoderInstance = new TextDecoder();

/**
 * GetCryptoKey - Derives an AES-GCM crypto key from stable internal seed/salt
 * @returns {Promise<CryptoKey>} The derived AES-GCM CryptoKey used for encrypt/decrypt
 */
const GetCryptoKey = async() =>
{
    const BaseKey = await crypto.subtle.importKey('raw', TextEncoderInstance.encode(Seed), 'PBKDF2', false, [ 'deriveKey' ]);

    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: TextEncoderInstance.encode(Salt), iterations: 100_000, hash: 'SHA-256' }, BaseKey, { name: 'AES-GCM', length: 256 }, false, [ 'encrypt', 'decrypt' ]);
};

/**
 * Encrypt - Encrypts a UTF-8 string using derived AES-GCM key
 * @param {string} Message - The plaintext message to encrypt
 * @returns {Promise<{IV:number[];Data:number[]}>} Encrypted payload containing IV and ciphertext bytes
 */
const Encrypt = async(Message: string) =>
{
    const Key = await GetCryptoKey();
    const IV = crypto.getRandomValues(new Uint8Array(12));

    const CipherText = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: IV }, Key, TextEncoderInstance.encode(Message));

    return { IV: [ ...IV ], Data: [ ...new Uint8Array(CipherText) ] };
};

/**
 * Decrypt - Decrypts an encrypted payload produced by Encrypt
 * @param {{IV:number[];Data:number[]}} Payload - The encrypted payload containing IV and ciphertext
 * @returns {Promise<string>} The decrypted UTF-8 plaintext
 */
const Decrypt = async(Payload: { IV: number[]; Data: number[] }) =>
{
    const Key = await GetCryptoKey();

    const PlainBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(Payload.IV) }, Key, new Uint8Array(Payload.Data));

    return TextDecoderInstance.decode(PlainBuffer);
};

/**
 * SetValue - Stores a plaintext value in persistent storage
 * @param {StorageKey} Key - The storage key name
 * @param {string} Value - The plaintext string value to store
 * @returns {Promise<void>} Resolves after value is saved
 */
export const SetValue = async(Key: StorageKey, Value: string) =>
{
    await Storage.set(Key, Value);

    await Storage.save();
};

/**
 * SetValueSafe - Encrypts and stores a value in persistent storage
 * @param {StorageKey} Key - The storage key name
 * @param {string} Value - The plaintext string to encrypt and store
 * @returns {Promise<void>} Resolves after encrypted value is saved
 */
export const SetValueSafe = async(Key: StorageKey, Value: string) =>
{
    const Encrypted = await Encrypt(Value);

    await Storage.set(Key, Encrypted);
    await Storage.save();
};

/**
 * GetValue - Retrieves a plaintext value from persistent storage
 * @param {StorageKey} Key - The storage key name
 * @returns {Promise<string | undefined>} Stored string or undefined if not set
 */
export const GetValue = async(Key: StorageKey) =>
{
    return await Storage.get<string>(Key);
};

/**
 * GetValueSafe - Retrieves and decrypts a stored encrypted value
 * @param {StorageKey} Key - The storage key name
 * @returns {Promise<string | undefined>} Decrypted plaintext or undefined if not found
 */
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
