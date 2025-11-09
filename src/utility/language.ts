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
    },
    {
        Code: 'hi',
        Country: 'in'
    },
    {
        Code: 'es',
        Country: 'es'
    },
    {
        Code: 'fr',
        Country: 'fr'
    },
    {
        Code: 'de',
        Country: 'de'
    },
    {
        Code: 'ru',
        Country: 'ru'
    },
    {
        Code: 'zh',
        Country: 'cn'
    },
    {
        Code: 'ja',
        Country: 'jp'
    },
    {
        Code: 'ko',
        Country: 'kr'
    },
    {
        Code: 'ar',
        Country: 'sa'
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

    switch (Storage.GetValue('APP_LANGUAGE') ?? '')
    {
        case 'fa':
        {
            Lang = 'fa';

            break;
        }
        case 'hi':
        {
            Lang = 'hi';

            break;
        }
        case 'es':
        {
            Lang = 'es';

            break;
        }
        case 'fr':
        {
            Lang = 'fr';

            break;
        }
        case 'de':
        {
            Lang = 'de';

            break;
        }
        case 'ru':
        {
            Lang = 'ru';

            break;
        }
        case 'zh':
        {
            Lang = 'zh';

            break;
        }
        case 'ja':
        {
            Lang = 'ja';

            break;
        }
        case 'ko':
        {
            Lang = 'ko';

            break;
        }
        case 'ar':
        {
            Lang = 'ar';

            break;
        }
    }

    await SetLang(Lang);
};

export const T = (Name: string): string => ResolveKey(Name) ?? `[${ Name }]`;

export default { Initialize, SetLang, GetLang, Language };
