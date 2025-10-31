export type LanguageType = 'us' | 'fa';

let LanguageMap: Record<string, Record<string, never>> = {};

const ResolveKey = (K: string): string | undefined =>
{
    let Result = LanguageMap;

    for (const Key of K.split('.'))
    {
        if (typeof Result[Key] === 'undefined')
        {
            continue;
        }

        Result = Result[Key];
    }

    return typeof Result === 'string' ? Result : undefined;
};

const SetLang = async(Lang: LanguageType) =>
{
    localStorage.setItem('Language', Lang);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    LanguageMap = (await import(`../assets/lang/${ Lang }.json`)).default;
};

export const T = (Name: string): string => ResolveKey(Name) ?? `[${ Name }]`;

export default { SetLang, T };
