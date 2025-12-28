import type { JSX } from 'react';

import { useEffect, useState } from 'react';

import NavigationComponent from '../components/home/navigation';

import EventMap from '../utility/event';

export default function HomePage()
{
    const [ HomePage, SetHomePage ] = useState<JSX.Element>();

    useEffect(() =>
    {
        const HomePageHandler = (Component: JSX.Element) =>
        {
            SetHomePage(Component);
        };

        EventMap.On('Home.Page', HomePageHandler);

        return () =>
        {
            EventMap.Off('Home.Page', HomePageHandler);
        };
    }, [ ]);

    return (
        <div className='relative flex h-full w-full flex-col items-center justify-center bg-base'>

            {
                HomePage
            }

            <NavigationComponent />

        </div>);
}
