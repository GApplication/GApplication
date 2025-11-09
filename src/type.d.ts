// Event
interface EventMap
{
    ToastAdd: [Component: JSX.Element];
    ToastRemove: [ID: number];

    ModalAdd: [Component: JSX.Element];
    ModalRemove: [ID: number];
}

type EventCall<T extends keyof EventMap> = (...Args: EventMap[T]) => void;

// API
type InstallResponse = (Response?: { Result: number }) => void;
type InviteResponse = (Response?: { Result: number }) => void;

type APIResponse = InstallResponse | InviteResponse;

// Storage
type StorageKey = 'APP_LANGUAGE' | 'APP_INSTALL';

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
