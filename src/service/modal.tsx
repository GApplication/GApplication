import { useEffect, useState, cloneElement, type JSX } from 'react';

import EventMap from '../utility/event';

export const Modal = (Component: JSX.Element, Option: { ID?: number } = {}) =>
{
    const ID = Option.ID ?? Date.now();

    EventMap.Emit('ModalAdd', cloneElement(Component, { ID, key: ID }));
};

export const ModalClose = (ID: number) =>
{
    EventMap.Emit('ModalRemove', ID);
};

export default function ModalContainer()
{
    const [ ToastMap, SetToastMap ] = useState<JSX.Element[]>([ ]);

    useEffect(() =>
    {
        const ToastAdd = (Component: JSX.Element) =>
        {
            SetToastMap((Previous) => [ ...Previous, Component ]);
        };

        const ToastRemove = (ID: number) =>
        {
            SetToastMap((Previous) => Previous.filter((I) => I.key !== `${ ID }`));
        };

        EventMap.On('ModalAdd', ToastAdd);
        EventMap.On('ModalRemove', ToastRemove);

        return () =>
        {
            EventMap.Off('ModalAdd', ToastAdd);
            EventMap.Off('ModalRemove', ToastRemove);
        };
    }, [ ]);

    return <div className='flex flex-col items-center w-screen h-screen absolute z-20 top-[0px] pointer-events-none overflow-hidden'>

        {
            ToastMap
        }

    </div>;
}
