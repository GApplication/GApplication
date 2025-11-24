// Event
interface EventMap
{
    'App.Page': [Component: JSX.Element];

    'Toast.Add': [Component: JSX.Element];
    'Toast.Remove': [ID: number];

    'Modal.Add': [Component: JSX.Element];
    'Modal.Remove': [ID: number];
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
