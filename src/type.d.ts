// Event
interface EventMap
{
    'Page.Open': [Component: JSX.Element];
    'Page.Close': [ID: number];

    'Toast.Open': [Component: JSX.Element];
    'Toast.Close': [ID: number];

    'Modal.Open': [Component: JSX.Element];
    'Modal.Close': [ID: number];
}

type EventCall<T extends keyof EventMap> = (...Args: EventMap[T]) => void;

// Storage
type StorageKey = 'App.Language' | 'App.Theme';

// Language
type LanguageType = 'en' | 'fa' | 'tr' | 'ar' | 'zh' | 'ru' | 'hi';

// General
declare module 'swiper/css'
{
    const Value: string;

    export default Value;
}

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

declare module '*.jpg'
{
    const Value: string;

    export default Value;
}

declare module '*.svg'
{
    const Value: string;

    export default Value;
}
