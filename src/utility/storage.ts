export const SetValue = (Key: StorageKey, Value: string) =>
{
    localStorage.setItem(Key, Value);
};

export const GetValue = (Key: StorageKey) =>
{
    return localStorage.getItem(Key);
};

export default { SetValue, GetValue };
