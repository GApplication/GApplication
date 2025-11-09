export default function Loading({ Size = 24, Width = 2 }: { readonly Size?: number; readonly Width?: number })
{
    return <div
        className='border-white border-b-white/25 border-t-white/25 rounded-full animate-spin'
        style={ { width: Size, height: Size, borderWidth: Width } } />;
}
