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
        const AddHandler = (Component: JSX.Element) =>
        {
            SetLayoutMap((Previous) => [ ...Previous, Component ]);
        };

        const RemoveHandler = (ID: number) =>
        {
            SetLayoutMap((Previous) => Previous.filter((I) => I.key !== `${ ID }`));
        };

        EventMap.On('Page.Add', AddHandler);
        EventMap.On('Page.Remove', RemoveHandler);

        return () =>
        {
            EventMap.Off('Page.Add', AddHandler);
            EventMap.Off('Page.Remove', RemoveHandler);
        };
    }, [ ]);

    if (LayoutMap.length === 0)
    {
        return;
    }

    return <div
        className='absolute top-[0px] z-1 h-screen w-screen overflow-hidden'
        style={ { paddingTop: IsWindow ? '32px' : '0px' } }>

        <WindowBarComponent />

        {
            LayoutMap
        }

    </div>;
}
