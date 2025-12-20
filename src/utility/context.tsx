import type { JSX } from 'react';

import EventMap from './event';

/**
 * OpenPage - Emits a page open event to render a new page component
 * @template T
 * @param {(Prop: { ID: number } & T) => JSX.Element} Component - The page component to render
 * @param {object} [Option] - Props to pass into the page
 */
const OpenPage = <T extends object>(Component: (Prop: { ID: number } & T) => JSX.Element, Option: keyof T extends never ? { ID: number } : { ID: number } & T) =>
{
    const ID = Option.ID;

    const Props = { ...Option } as { ID: number } & T;

    EventMap.Emit('Page.Open', <Component { ...Props } key={ ID } />);
};

/**
 * ClosePage - Emits a page close event for a given page ID
 * @param {number} ID - The page instance identifier to close
 */
const ClosePage = (ID: number) =>
{
    EventMap.Emit('Page.Close', ID);
};

/**
 * OpenModal - Emits a modal open event to render a modal component
 * @template T
 * @param {(Prop: { ID: number } & T) => JSX.Element} Component - The modal component to open
 * @param {object} [Option] - Optional props to pass into the modal (may include ID)
 */
const OpenModal = <T extends object = object>(Component: (Prop: { ID: number } & T) => JSX.Element, Option?: keyof T extends never ? { ID?: number } : { ID?: number } & T) =>
{
    const ID = Option?.ID || Date.now();

    const Props = { ...Option, ID } as { ID: number } & T;

    EventMap.Emit('Modal.Open', <Component { ...Props } key={ ID } />);
};

/**
 * CloseModal - Emits a modal close event for a given modal ID
 * @param {number} ID - The modal instance identifier to close
 */
const CloseModal = (ID: number) =>
{
    EventMap.Emit('Modal.Close', ID);
};

/**
 * OpenToast - Emits a toast open event to render a transient toast component
 * @template T
 * @param {(Prop: { ID: number } & T) => JSX.Element} Component - The toast component to open
 * @param {object} [Option] - Optional props to pass into the toast (may include ID)
 */
const OpenToast = <T extends object = object>(Component: (Prop: { ID: number } & T) => JSX.Element, Option?: keyof T extends never ? { ID?: number } : { ID?: number } & T) =>
{
    const ID = Option?.ID || Date.now();

    const Props = { ...Option, ID } as { ID: number } & T;

    EventMap.Emit('Toast.Open', <Component { ...Props } key={ ID } />);
};

/**
 * CloseToast - Emits a toast close event for a given toast ID
 * @param {number} ID - The toast instance identifier to close
 */
const CloseToast = (ID: number) =>
{
    EventMap.Emit('Toast.Close', ID);
};

export default { OpenPage, ClosePage, OpenModal, CloseModal, OpenToast, CloseToast };
