import type { JSX } from 'react';

import { useEffect, useState } from 'react';
import { platform } from '@tauri-apps/plugin-os';

import EventMap from '../utility/event';

/**
 * ToastLayout - Renders active toast components and adjusts for platform UI
 * @returns {JSX.Element | undefined} Container for toast components or undefined when empty
 */
export default function ToastLayout()
{
    const IsWindow = platform() === 'windows';

    const [ LayoutMap, SetLayoutMap ] = useState<JSX.Element[]>([ ]);

    useEffect(() =>
    {
        /**
         * OpenHandler - Adds a toast component to the layout map
         * @param {JSX.Element} Component - The toast component instance to add
         */
        const OpenHandler = (Component: JSX.Element) =>
        {
            SetLayoutMap((Previous) => [ ...Previous, Component ]);
        };

        /**
         * CloseHandler - Removes a toast component from the layout map by ID
         * @param {number} ID - The toast component numeric identifier
         */
        const CloseHandler = (ID: number) =>
        {
            SetLayoutMap((Previous) => Previous.filter((I) => I.key !== `${ ID }`));
        };

        EventMap.On('Toast.Open', OpenHandler);
        EventMap.On('Toast.Close', CloseHandler);

        return () =>
        {
            EventMap.Off('Toast.Open', OpenHandler);
            EventMap.Off('Toast.Close', CloseHandler);
        };
    }, [ ]);

    if (LayoutMap.length === 0)
    {
        return;
    }

    return <div
        className='pointer-events-none absolute left-1/2 z-3 flex h-full min-h-[700px] w-full max-w-[720px] min-w-[360px] -translate-x-1/2 flex-col overflow-hidden'
        style={ { paddingTop: IsWindow ? '32px' : '0px' } }>

        {
            LayoutMap
        }

    </div>;
}
