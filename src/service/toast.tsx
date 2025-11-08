import { useEffect, useState, type JSX } from 'react';

import EventMap from '../utility/event';

function ToastItem({ ID, Delay, Component }: { ID: number; Delay: number; Component: JSX.Element })
{
    useEffect(() =>
    {
        const T = setTimeout(() => EventMap.Emit('ToastRemove', ID), Delay);

        return () =>
        {
            clearTimeout(T);
        };
    }, [ ]);

    return Component;
}

export const Toast = (Component: JSX.Element, Option: { ID?: number; Delay?: number } = {}) =>
{
    const Delay = Option.Delay ?? 5000;
    const ID = Option.ID ?? Date.now() / 1000;

    EventMap.Emit('ToastAdd', <ToastItem
        Component={ Component }
        Delay={ Delay }
        ID={ ID }
        key={ ID } />);
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

    return <div className='w-screen h-screen absolute z-30 top-[0px] pointer-events-none'>

        {
            ToastMap
        }

    </div>;
}
