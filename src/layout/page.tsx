import type { JSX } from 'react';

import { useEffect, useState } from 'react';
import { platform } from '@tauri-apps/plugin-os';

import WindowBarComponent from '../components/shared/windowBar';

import EventMap from '../utility/event';

export default function PageLayout()
{
    const IsWindow = platform() === 'windows';

    const [ LayoutMap, SetLayoutMap ] = useState<JSX.Element[]>([ ]);

    useEffect(() =>
    {
        const OpenHandler = (Component: JSX.Element) =>
        {
            SetLayoutMap((Previous) => [ ...Previous, Component ]);
        };

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

    return <div
        className='absolute top-[0px] z-1 h-full min-h-[700px] min-w-[360px] overflow-hidden'
        style={ { paddingTop: IsWindow ? '32px' : '0px' } }>

        <WindowBarComponent />

        {
            LayoutMap
        }

    </div>;
}
