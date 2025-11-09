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
    const [ ModalMap, SetModalMap ] = useState<JSX.Element[]>([ ]);

    useEffect(() =>
    {
        const ModalAdd = (Component: JSX.Element) =>
        {
            SetModalMap((Previous) => [ ...Previous, Component ]);
        };

        const ModalRemove = (ID: number) =>
        {
            SetModalMap((Previous) => Previous.filter((I) => I.key !== `${ ID }`));
        };

        EventMap.On('ModalAdd', ModalAdd);
        EventMap.On('ModalRemove', ModalRemove);

        return () =>
        {
            EventMap.Off('ModalAdd', ModalAdd);
            EventMap.Off('ModalRemove', ModalRemove);
        };
    }, [ ]);

    return <div className='flex flex-col items-center w-screen h-screen absolute z-20 top-[0px] pointer-events-none overflow-hidden'>

        {
            ModalMap
        }

    </div>;
}
