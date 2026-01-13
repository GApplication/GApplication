import type { JSX } from 'react';

import { useEffect, useState } from 'react';
import { platform } from '@tauri-apps/plugin-os';

import EventMap from '../utility/event';

/**
 * ModalLayout - Renders modal components and manages open/close lifecycle
 * @returns {JSX.Element | undefined} Modal container or undefined when empty
 */
export default function ModalLayout()
{
    const IsWindow = platform() === 'windows';

    const [ LayoutMap, SetLayoutMap ] = useState<JSX.Element[]>([ ]);

    useEffect(() =>
    {
        /**
         * OpenHandler - Adds a modal component to the layout map
         * @param {JSX.Element} Component - The modal component instance to add
         */
        const OpenHandler = (Component: JSX.Element) =>
        {
            SetLayoutMap((Previous) => [ ...Previous, Component ]);
        };

        /**
         * CloseHandler - Removes a modal component from the layout map by ID
         * @param {number} ID - The modal component numeric identifier
         */
        const CloseHandler = (ID: number) =>
        {
            SetLayoutMap((Previous) => Previous.filter((I) => I.key !== `${ ID }`));
        };

        /**
         * CloseAllHandler - Removes all modal component from the layout map
         */
        const CloseAllHandler = () =>
        {
            SetLayoutMap([ ]);
        };

        EventMap.On('Modal.Open', OpenHandler);
        EventMap.On('Modal.Close', CloseHandler);
        EventMap.On('Modal.CloseAll', CloseAllHandler);

        return () =>
        {
            EventMap.Off('Modal.Open', OpenHandler);
            EventMap.Off('Modal.Close', CloseHandler);
            EventMap.Off('Modal.CloseAll', CloseAllHandler);
        };
    }, [ ]);

    if (LayoutMap.length === 0)
    {
        return;
    }

    return <div
        className='absolute left-1/2 z-2 flex h-full min-h-[700px] w-full max-w-[720px] min-w-[360px] -translate-x-1/2 overflow-hidden'
        style={ { paddingTop: IsWindow ? '32px' : '0px' } }>

        <div className='relative size-full'>

            {
                LayoutMap
            }

        </div>

    </div>;
}
