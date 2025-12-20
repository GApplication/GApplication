import { GetValueSafe, SetValueSafe } from '../utility/storage';

/**
 * Login - Stores user credentials (passcode and phrase) for account access
 * @param {string} Passcode - The user's passcode to store
 * @param {string} Phrase - The user's mnemonic phrase to store
 * @returns {Promise<void>} Resolves after credentials are saved
 */
export const Login = async(Passcode: string, Phrase: string) =>
{
    await SetValueSafe('App.Passcode', Passcode);
    await SetValueSafe('App.Phrase', Phrase);
};

/**
 * IsLogged - Indicates whether a user account/session is currently logged in
 * Checks if both Passcode and Phrase are stored in persistent storage
 * @returns {Promise<boolean>} True when both credentials are available, false otherwise
 */
export const IsLogged = async() =>
{
    const Passcode = await GetValueSafe('App.Passcode');
    const Phrase = await GetValueSafe('App.Phrase');

    return Passcode !== undefined && Phrase !== undefined;
};

/**
 * GetPasscode - Retrieves the stored passcode
 * @returns {Promise<string | undefined>} The decrypted passcode or undefined if not set
 */
export const GetPasscode = async() =>
{
    return await GetValueSafe('App.Passcode');
};

/**
 * GetPhrase - Retrieves the stored mnemonic phrase
 * @returns {Promise<string | undefined>} The decrypted phrase or undefined if not set
 */
export const GetPhrase = async() =>
{
    return await GetValueSafe('App.Phrase');
};

/**
 * Logout - Clears all stored account credentials
 * @returns {Promise<void>} Resolves after credentials are cleared
 */
export const Logout = async() =>
{
    // Note: To implement full logout, you'll need to add a RemoveValue function to storage.ts
    // For now, this is a placeholder that can be expanded
};

export default { IsLogged, Login, GetPasscode, GetPhrase, Logout };
