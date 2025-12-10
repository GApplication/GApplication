import Storage from './storage';

const Toggle = () =>
{
    let Base: { L: number; C: number; H: number };
    let BaseText: { L: number; C: number; H: number };
    let BaseBorder: { L: number; C: number; H: number };
    let BaseReverse: { L: number; C: number; H: number };
    let BaseOutline: { L: number; C: number; H: number };
    let BaseSecondary: { L: number; C: number; H: number };

    switch (Storage.GetValue('APP.THEME'))
    {
        case 'DARK':
        {
            Base = { L: 12, C: 0, H: 0 };
            BaseText = { L: 92, C: 4, H: 240 };
            BaseBorder = { L: 24, C: 8, H: 260 };
            BaseReverse = { L: 98, C: 0, H: 0 };
            BaseOutline = { L: 45, C: 20, H: 275 };
            BaseSecondary = { L: 20, C: 10, H: 230 };

            Storage.SetValue('APP.THEME', 'LIGHT');

            break;
        }
        default:
        {
            Base = { L: 98, C: 0, H: 0 };
            BaseText = { L: 0, C: 0, H: 0 };
            BaseBorder = { L: 92, C: 0, H: 0 };
            BaseReverse = { L: 8, C: 0, H: 0 };
            BaseOutline = { L: 84, C: 0, H: 0 };
            BaseSecondary = { L: 92, C: 0, H: 0 };

            Storage.SetValue('APP.THEME', 'DARK');

            break;
        }
    }

    document.documentElement.style.setProperty('--color-base', `oklch(${ Base.L }% ${ Base.C } ${ Base.H })`);
    document.documentElement.style.setProperty('--color-base-text', `oklch(${ BaseText.L }% ${ BaseText.C } ${ BaseText.H })`);
    document.documentElement.style.setProperty('--color-base-border', `oklch(${ BaseBorder.L }% ${ BaseBorder.C } ${ BaseBorder.H })`);
    document.documentElement.style.setProperty('--color-base-reverse', `oklch(${ BaseReverse.L }% ${ BaseReverse.C } ${ BaseReverse.H })`);
    document.documentElement.style.setProperty('--color-base-outline', `oklch(${ BaseOutline.L }% ${ BaseOutline.C } ${ BaseOutline.H })`);
    document.documentElement.style.setProperty('--color-base-secondary', `oklch(${ BaseSecondary.L }% ${ BaseSecondary.C } ${ BaseSecondary.H })`);
};

export default { Toggle };
