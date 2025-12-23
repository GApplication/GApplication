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

/**
 * ResolveKey - Resolves a dotted translation key into a localized string value
 * @param {string} K - Dot-separated key path (e.g. 'Splash.Slide1Header')
 * @returns {string | undefined} The resolved string or undefined if missing
 */
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

/**
 * Initialize - Loads persisted language preference and applies it
 * @returns {Promise<void>} Resolves after language resources are loaded
 */
const Initialize = async() =>
{
    let Lang: LanguageType = 'en';

    switch (await Storage.GetValue('App.Language') ?? '')
    {
        case 'fa':
        {
            Lang = 'fa';

            break;
        }
        case 'tr':
        {
            Lang = 'tr';

            break;
        }
        case 'ar':
        {
            Lang = 'ar';

            break;
        }
        case 'zh':
        {
            Lang = 'zh';

            break;
        }
        case 'ru':
        {
            Lang = 'ru';

            break;
        }
        case 'hi':
        {
            Lang = 'hi';

            break;
        }
    }

    await SetLang(Lang);
};

/**
 * SetLang - Sets the current language and loads language resource file
 * @param {LanguageType} Lang - The language code to set (e.g. 'en')
 * @returns {Promise<void>} Resolves when resource has been loaded and applied
 */
const SetLang = async(Lang: LanguageType) =>
{
    LangCurrent = Lang;

    Storage.SetValue('App.Language', Lang);

    // eslint-disable-next-line unicorn/no-await-expression-member
    LanguageMap = (await import(`../assets/lang/${ Lang }.json`)).default;

    let Dir = 'ltr';

    if (Lang === 'fa' || Lang === 'ar')
    {
        Dir = 'rtl';
    }

    document.documentElement.dir = Dir;
};

/**
 * GetLang - Returns the metadata for the currently selected language
 * @returns {{ Code: LanguageType; Country: string }} Language metadata object
 */
const GetLang = () =>
{
    const Lang = Language.find((I) => I.Code === LangCurrent);

    if (Lang === undefined)
    {
        return Language[0];
    }

    return Lang;
};

/**
 * T - Translation helper that resolves a localized string and applies simple
 * positional substitutions using %s tokens
 * @param {string} Name - The translation key
 * @param {...(string|number)} Args - Optional substitution values for %s tokens
 * @returns {string} The final translated string
 */
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
