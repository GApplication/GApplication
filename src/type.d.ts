// Event.ts
interface EventMap
{
    ToastAdd: [Component: JSX.Element];
    ToastRemove: [ID: number];
}

type EventCall<T extends keyof EventMap> = (...Args: EventMap[T]) => void;

// Storage.ts
type StorageKey = 'APP_LANGUAGE';

// Language.ts
type LanguageType = 'us' | 'fa' | 'ar';

// General
declare module '*.css'
{
    const Value: string;

    export default Value;
}

declare module '*.png'
{
    const Value: string;

    export default Value;
}

declare module '*.svg'
{
    const Value: string;

    export default Value;
}
