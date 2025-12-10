import { load } from '@tauri-apps/plugin-store';

const Storage = await load('application.bin');

export const SetValue = async(Key: StorageKey, Value: string) =>
{
    await Storage.set(Key, Value);

    await Storage.save();
};

export const GetValue = async(Key: StorageKey) =>
{
    return await Storage.get<string>(Key);
};

export default { SetValue, GetValue };
