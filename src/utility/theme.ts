import Storage from './storage';

const SetTheme = async(Theme: 'LIGHT' | 'DARK') =>
{
    await Storage.SetValue('APP.THEME', Theme);

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

const Initialize = async() =>
{
    await SetTheme(await Storage.GetValue('APP.THEME') === 'DARK' ? 'DARK' : 'LIGHT');
};

const Toggle = async() =>
{
    await SetTheme(await Storage.GetValue('APP.THEME') === 'DARK' ? 'LIGHT' : 'DARK');
};

export default { Initialize, Toggle };
