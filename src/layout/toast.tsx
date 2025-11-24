import { platform } from '@tauri-apps/plugin-os';
import { useEffect, useState, cloneElement, type JSX } from 'react';

import EventMap from '../utility/event';

export const Toast = (Component: JSX.Element, Option: { ID?: number; Delay?: number } = {}) =>
{
    const ID = Option.ID ?? Date.now();
    const Delay = Option.Delay ?? 5000;

    EventMap.Emit('Toast.Add', cloneElement(Component, { ID, Delay, key: ID }));
};

export const ToastClose = (ID: number) =>
{
    EventMap.Emit('Toast.Remove', ID);
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

        EventMap.On('Toast.Add', ToastAdd);
        EventMap.On('Toast.Remove', ToastRemove);

        return () =>
        {
            EventMap.Off('Toast.Add', ToastAdd);
            EventMap.Off('Toast.Remove', ToastRemove);
        };
    }, [ ]);

    if (ToastMap.length === 0)
    {
        return undefined;
    }

    return <div
        className='flex flex-col items-center w-screen h-screen absolute z-30 top-[0px] pointer-events-none overflow-hidden'
        style={ { paddingTop: platform() === 'windows' ? '40px' : '0px' } }>

        {
            ToastMap
        }

    </div>;
}
