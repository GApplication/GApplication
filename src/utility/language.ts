import Storage from './storage';

let LangCurrent: LanguageType = 'en';
let LanguageMap: Record<string, Record<string, never>> = {};

const Language: { Code: LanguageType; Country: string } [] =
[
    {
        Code: 'en',
        Country: 'us'
    },
    {
        Code: 'fa',
        Country: 'ir'
    }
];

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
    LangCurrent = Lang;

    Storage.SetValue('APP.LANGUAGE', Lang);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, unicorn/no-await-expression-member, @typescript-eslint/no-unsafe-member-access
    LanguageMap = (await import(`../assets/lang/${ Lang }.json`)).default;

    let Dir = 'ltr';

    if (Lang === 'fa')
    {
        Dir = 'rtl';
    }

    document.documentElement.dir = Dir;
};

const GetLang = () =>
{
    const Lang = Language.find((I) => I.Code === LangCurrent);

    if (Lang === undefined)
    {
        return Language[0];
    }

    return Lang;
};

const Initialize = async() =>
{
    let Lang: LanguageType = 'en';

    switch (Storage.GetValue('APP.LANGUAGE') ?? '')
    {
        case 'fa':
        {
            Lang = 'fa';

            break;
        }
    }

    await SetLang(Lang);
};

export const T = (Name: string): string => ResolveKey(Name) ?? `[${ Name }]`;

export default { Initialize, SetLang, GetLang, Language };
