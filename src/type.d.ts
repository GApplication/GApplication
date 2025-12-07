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

// API
type InstallResponse = (Response?: { Result: number }) => void;
type InviteResponse = (Response?: { Result: number }) => void;

type APIResponse = InstallResponse | InviteResponse;

// Storage
type StorageKey = 'APP.LANGUAGE' | 'APP.INSTALL';

// Language
type LanguageType = 'en' | 'fa';

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
