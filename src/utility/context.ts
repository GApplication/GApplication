import type { JSX } from 'react';

import { cloneElement } from 'react';

import EventMap from './event';

const OpenPage = (Component: JSX.Element, Option?: { ID: number }) =>
{
    const ID = Option?.ID ?? Date.now();

    EventMap.Emit('Page.Open', cloneElement(Component, { ID }));
};

const ClosePage = (ID: number) =>
{
    EventMap.Emit('Page.Close', ID);
};

const OpenModal = (Component: JSX.Element, Option?: { ID: number }) =>
{
    const ID = Option?.ID ?? Date.now();

    EventMap.Emit('Modal.Open', cloneElement(Component, { ID }));
};

const CloseModal = (ID: number) =>
{
    EventMap.Emit('Modal.Close', ID);
};

export default { OpenPage, ClosePage, OpenModal, CloseModal };
