const Salt = 'GApp.Internal.Salt.Hash';

const ValidatePasscode = (Passcode: string[]) =>
{
    for (let I = 0; I < 4; I++)
    {
        if (Passcode[I] !== Passcode[I + 4])
        {
            return true;
        }
    }

    return false;
};

const HashWithSalt = async(Message: string) =>
{
    const Data = new TextEncoder().encode(Message + Salt);

    const HashBuffer = await crypto.subtle.digest('SHA-256', Data);

    const HashArray = [ ...new Uint8Array(HashBuffer) ];

    return HashArray.map((B) => B.toString(16).padStart(2, '0')).join('');
};

export default { ValidatePasscode, HashWithSalt };
