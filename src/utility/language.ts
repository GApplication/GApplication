import Storage from './storage';

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
    Storage.SetValue('APP_LANGUAGE', Lang);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    LanguageMap = (await import(`../assets/lang/${ Lang }.json`)).default;

    let Dir = 'ltr';

    if (Lang === 'fa' || Lang === 'ar')
    {
        Dir = 'rtl';
    }

    document.documentElement.dir = Dir;
};

const Initialize = async() =>
{
    let Lang: LanguageType = 'us';

    switch (Storage.GetValue('APP_LANGUAGE') ?? '')
    {
        case 'ar':
        {
            Lang = 'ar';

            break;
        }
        case 'fa':
        {
            Lang = 'fa';

            break;
        }
    }

    await SetLang(Lang);
};

export const T = (Name: string): string => ResolveKey(Name) ?? `[${ Name }]`;

export default { Initialize, SetLang, T };
