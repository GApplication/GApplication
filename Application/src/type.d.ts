// Home Navigation
type NavigationMap = 'WALLET' | 'HOME' | 'BROWSER';

// Event
interface EventMap
{
    'Page.Open': [Component: JSX.Element];
    'Page.Close': [ID: number];
    'Page.CloseAll': [ID: number];

    'Toast.Open': [Component: JSX.Element];
    'Toast.Close': [ID: number];

    'Modal.Open': [Component: JSX.Element];
    'Modal.Close': [ID: number];
    'Modal.CloseAll': [ID: number];

    'Home.Page': [Component: JSX.Element];
}

type EventCall<T extends keyof EventMap> = (...Args: EventMap[T]) => void;

// Phrase Word Count
type PhraseKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

// Storage
type StorageKey = 'App.Language' | 'App.Theme' | 'App.Phrase' | 'App.Passcode';

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
