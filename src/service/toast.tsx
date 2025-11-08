import { useEffect, useState, cloneElement, type JSX } from 'react';

import EventMap from '../utility/event';

export const Toast = (Component: JSX.Element, Option: { ID?: number; Delay?: number } = {}) =>
{
    const ID = Option.ID ?? Date.now();
    const Delay = Option.Delay ?? 5000;

    EventMap.Emit('ToastAdd', cloneElement(Component, { ID, Delay, key: ID }));
};

export default function ToastContainer()
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

        EventMap.On('ToastAdd', ToastAdd);
        EventMap.On('ToastRemove', ToastRemove);

        return () =>
        {
            EventMap.Off('ToastAdd', ToastAdd);
            EventMap.Off('ToastRemove', ToastRemove);
        };
    }, [ ]);

    return <div className='flex flex-col items-center w-screen h-screen absolute z-30 top-[0px] pointer-events-none overflow-hidden'>

        {
            ToastMap
        }

    </div>;
}
