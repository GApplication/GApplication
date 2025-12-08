import type { JSX } from 'react';

import { useEffect, useState } from 'react';
import { platform } from '@tauri-apps/plugin-os';

import EventMap from '../utility/event';

export default function ModalLayout()
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

        EventMap.On('Modal.Open', OpenHandler);
        EventMap.On('Modal.Close', CloseHandler);

        return () =>
        {
            EventMap.Off('Modal.Open', OpenHandler);
            EventMap.Off('Modal.Close', CloseHandler);
        };
    }, [ ]);

    if (LayoutMap.length === 0)
    {
        return;
    }

    return <div
        className='absolute left-1/2 z-2 flex h-full min-h-[700px] w-full max-w-[720px] min-w-[360px] -translate-x-1/2'
        style={ { paddingTop: IsWindow ? '32px' : '0px' } }>

        {
            LayoutMap
        }

    </div>;
}
