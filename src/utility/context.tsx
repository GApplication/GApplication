import type { JSX } from 'react';

import EventMap from './event';

const OpenPage = <T extends object = object>(Component: (Prop: { ID: number } & T) => JSX.Element, Option?: keyof T extends never ? { ID?: number } : { ID?: number } & T) =>
{
    const ID = Option?.ID || Date.now();

    const Props = { ...Option, ID } as { ID: number } & T;

    EventMap.Emit('Page.Open', <Component { ...Props } key={ ID } />);
};

const ClosePage = (ID: number) =>
{
    EventMap.Emit('Page.Close', ID);
};

const OpenModal = <T extends object = object>(Component: (Prop: { ID: number } & T) => JSX.Element, Option?: keyof T extends never ? { ID?: number } : { ID?: number } & T) =>
{
    const ID = Option?.ID || Date.now();

    const Props = { ...Option, ID } as { ID: number } & T;

    EventMap.Emit('Modal.Open', <Component { ...Props } key={ ID } />);
};

const CloseModal = (ID: number) =>
{
    EventMap.Emit('Modal.Close', ID);
};

const OpenToast = <T extends object = object>(Component: (Prop: { ID: number } & T) => JSX.Element, Option?: keyof T extends never ? { ID?: number } : { ID?: number } & T) =>
{
    const ID = Option?.ID || Date.now();

    const Props = { ...Option, ID } as { ID: number } & T;

    EventMap.Emit('Toast.Open', <Component { ...Props } key={ ID } />);
};

const CloseToast = (ID: number) =>
{
    EventMap.Emit('Toast.Close', ID);
};

export default { OpenPage, ClosePage, OpenModal, CloseModal, OpenToast, CloseToast };
