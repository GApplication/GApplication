const Random = (Min: number, Max: number) => Math.random() * (Max - Min) + Min;

const Clamp = (Value: number, Min: number, Max: number) => Math.max(Min, Math.min(Max, Value));

const GenerateTheme = () =>
{
    const L = Random(70, 92);
    const C = Random(0.03, 0.12);
    const H = Random(0, 360);

    const Content = { L: L, C: C, H: H };
    const ContentText = { L: (L > 70 ? 15 : 95), C: 0, H };
    const ContentHover = { L: Clamp(L + (L > 60 ? -8 : 8), 0, 100), C, H };
    const ContentBorder = { L: Clamp(L - 12, 0, 100), C: C * 0.4, H };

    document.documentElement.style.setProperty('--color-content', `oklch(${ Content.L }% ${ Content.C } ${ Content.H })`);
    document.documentElement.style.setProperty('--color-content-text', `oklch(${ ContentText.L }% ${ ContentText.C } ${ ContentText.H })`);
    document.documentElement.style.setProperty('--color-content-hover', `oklch(${ ContentHover.L }% ${ ContentHover.C } ${ ContentHover.H })`);
    document.documentElement.style.setProperty('--color-content-border', `oklch(${ ContentBorder.L }% ${ ContentBorder.C } ${ ContentBorder.H })`);
};

export default { Random, Clamp, GenerateTheme };
