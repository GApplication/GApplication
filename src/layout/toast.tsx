import type { JSX } from 'react';

import { useEffect, useState } from 'react';
import { platform } from '@tauri-apps/plugin-os';

import EventMap from '../utility/event';

export default function ToastLayout()
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
        className='absolute left-1/2 z-1 flex h-full min-h-[700px] w-full max-w-[720px] min-w-[360px] -translate-x-1/2'
        style={ { paddingTop: IsWindow ? '32px' : '0px' } }>

        {
            LayoutMap
        }

    </div>;
}
