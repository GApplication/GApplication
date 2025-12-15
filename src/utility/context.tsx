import type { JSX } from 'react';

import EventMap from './event';

const OpenPage = (Component: (Attribute: { ID: number }) => JSX.Element, Option?: { ID: number }) =>
{
    const ID = Option?.ID ?? Date.now();

    EventMap.Emit('Page.Open', <Component ID={ ID } key={ ID } />);
};

const ClosePage = (ID: number) =>
{
    EventMap.Emit('Page.Close', ID);
};

const OpenModal = (Component: (Attribute: { ID: number }) => JSX.Element, Option?: { ID: number }) =>
{
    const ID = Option?.ID ?? Date.now();

    EventMap.Emit('Modal.Open', <Component ID={ ID } key={ ID } />);
};

const CloseModal = (ID: number) =>
{
    EventMap.Emit('Modal.Close', ID);
};

const OpenToast = (Component: (Attribute: { ID: number; Delay: number; Message: string }) => JSX.Element, Option: { ID?: number; Delay?: number; Message: string }) =>
{
    const ID = Option.ID ?? Date.now();
    const Delay = Option.Delay ?? 5 * 1000;

    EventMap.Emit('Toast.Open', <Component Delay={ Delay } ID={ ID } Message={ Option.Message } key={ ID } />);
};

const CloseToast = (ID: number) =>
{
    EventMap.Emit('Toast.Close', ID);
};

export default { OpenPage, ClosePage, OpenModal, CloseModal, OpenToast, CloseToast };
