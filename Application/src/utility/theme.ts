import Storage from './storage';

/**
 * SetTheme - Applies the given theme values to the document and persists selection
 * @param {'LIGHT' | 'DARK'} Theme - The theme to apply
 * @returns {Promise<void>} Resolves when theme is applied and stored
 */
const SetTheme = async(Theme: 'LIGHT' | 'DARK') =>
{
    await Storage.SetValue('App.Theme', Theme);

    let Base: { L: number; C: number; H: number };
    let BaseText: { L: number; C: number; H: number };
    let BaseBorder: { L: number; C: number; H: number };
    let BaseReverse: { L: number; C: number; H: number };
    let BaseOutline: { L: number; C: number; H: number };
    let BaseSecondary: { L: number; C: number; H: number };

    if (Theme === 'LIGHT')
    {
        Base = { L: 98, C: 0, H: 0 };
        BaseText = { L: 8, C: 0, H: 0 };
        BaseBorder = { L: 92, C: 0, H: 0 };
        BaseReverse = { L: 2, C: 0, H: 0 };
        BaseOutline = { L: 84, C: 0, H: 0 };
        BaseSecondary = { L: 92, C: 0, H: 0 };
    }
    else
    {
        Base = { L: 30.857, C: 0.023, H: 264.149 };
        BaseText = { L: 90, C: 0, H: 0 };
        BaseBorder = { L: 28.036, C: 0.019, H: 264.182 };
        BaseReverse = { L: 0, C: 0, H: 0 };
        BaseOutline = { L: 26.346, C: 0.018, H: 262.177 };
        BaseSecondary = { L: 26.346, C: 0.018, H: 262.177 };
    }

    document.documentElement.style.setProperty('--color-base', `oklch(${ Base.L }% ${ Base.C } ${ Base.H })`);
    document.documentElement.style.setProperty('--color-base-text', `oklch(${ BaseText.L }% ${ BaseText.C } ${ BaseText.H })`);
    document.documentElement.style.setProperty('--color-base-border', `oklch(${ BaseBorder.L }% ${ BaseBorder.C } ${ BaseBorder.H })`);
    document.documentElement.style.setProperty('--color-base-reverse', `oklch(${ BaseReverse.L }% ${ BaseReverse.C } ${ BaseReverse.H })`);
    document.documentElement.style.setProperty('--color-base-outline', `oklch(${ BaseOutline.L }% ${ BaseOutline.C } ${ BaseOutline.H })`);
    document.documentElement.style.setProperty('--color-base-secondary', `oklch(${ BaseSecondary.L }% ${ BaseSecondary.C } ${ BaseSecondary.H })`);
};

/**
 * Initialize - Reads persisted theme preference and applies it
 * @returns {Promise<void>} Resolves when initialization is complete
 */
const Initialize = async() =>
{
    await SetTheme(await Storage.GetValue('App.Theme') === 'DARK' ? 'DARK' : 'LIGHT');
};

/**
 * Toggle - Toggles between LIGHT and DARK themes and persists selection
 * @returns {Promise<void>} Resolves when theme has been toggled and applied
 */
const Toggle = async() =>
{
    await SetTheme(await Storage.GetValue('App.Theme') === 'DARK' ? 'LIGHT' : 'DARK');
};

export default { Initialize, Toggle };
