import type { JSX } from 'react';

import { useEffect, useState } from 'react';
import { platform } from '@tauri-apps/plugin-os';

import WindowBarComponent from '../components/window_bar';

import EventMap from '../utility/event';

/**
 * PageLayout - Renders the active pages stack and the platform window bar
 * @returns {JSX.Element} The page container including the window bar and page views
 */
export default function PageLayout()
{
    const IsWindow = platform() === 'windows';

    const [ LayoutMap, SetLayoutMap ] = useState<JSX.Element[]>([ ]);

    useEffect(() =>
    {
        /**
         * OpenHandler - Adds a page component to the layout map
         * @param {JSX.Element} Component - The page component instance to add
         */
        const OpenHandler = (Component: JSX.Element) =>
        {
            SetLayoutMap((Previous) => [ ...Previous, Component ]);
        };

        /**
         * CloseHandler - Removes a page component from the layout map by ID
         * @param {number} ID - The page component numeric identifier
         */
        const CloseHandler = (ID: number) =>
        {
            SetLayoutMap((Previous) => Previous.filter((I) => I.key !== `${ ID }`));
        };

        EventMap.On('Page.Open', OpenHandler);
        EventMap.On('Page.Close', CloseHandler);

        return () =>
        {
            EventMap.Off('Page.Open', OpenHandler);
            EventMap.Off('Page.Close', CloseHandler);
        };
    }, [ ]);

    if (LayoutMap.length === 0)
    {
        return;
    }

    return <>

        <WindowBarComponent />

        <div
            className='absolute left-1/2 z-1 flex h-full min-h-[700px] w-full max-w-[720px] min-w-[360px] -translate-x-1/2'
            style={ { paddingTop: IsWindow ? '32px' : '0px' } }>

            {
                LayoutMap
            }

        </div>

    </>;
}
