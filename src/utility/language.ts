import Storage from './storage';

let LangCurrent: LanguageType = 'en';
let LanguageMap: Record<string, Record<string, never>> = {};

const Language: { Code: LanguageType; Country: string } [] =
[
    { Code: 'en', Country: 'us' },
    { Code: 'fa', Country: 'ir' },
    { Code: 'tr', Country: 'tr' },
    { Code: 'ar', Country: 'sa' },
    { Code: 'zh', Country: 'cn' },
    { Code: 'ru', Country: 'ru' },
    { Code: 'hi', Country: 'in' }
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

export const T = (Name: string, ...Args: (string | number)[]): string =>
{
    let Template = ResolveKey(Name) ?? `[${ Name }]`;

    for (const Arg of Args)
    {
        Template = Template.replace(/%s/, Arg.toString());
    }

    return Template;
};

export default { Initialize, SetLang, GetLang, Language };
