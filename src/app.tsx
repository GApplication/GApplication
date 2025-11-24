import type { JSX } from 'react';

import { Menu } from '@tauri-apps/api/menu';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { TrayIcon } from '@tauri-apps/api/tray';
import { platform } from '@tauri-apps/plugin-os';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { getCurrentWindow } from '@tauri-apps/api/window';

import InvitePage from './page/invite';
import SplashPage from './page/splash';

import ModalLayout from './layout/modal';
import ToastLayout from './layout/toast';

import EventMap from './utility/event';
import Account from './utility/account';
import Context from './utility/context';

import Language, { T } from './utility/language';

import './app.css';

function Application()
{
    const [ Page, SetPage ] = useState<JSX.Element>();

    useEffect(() =>
    {
        const AppPageHandler = (Component: JSX.Element) =>
        {
            SetPage(Component);
        };

        EventMap.On('App.Page', AppPageHandler);

        if (platform() === 'windows')
        {
            const AsyncTask = async() =>
            {
                const AppIcon = await defaultWindowIcon();

                if (AppIcon)
                {
                    const AppTrayMenu = await Menu.new({
                        items:
                        [
                            {
                                id: 'open',
                                text: T('Tray.Open'),
                                action: () =>
                                {
                                    void getCurrentWindow().show();
                                }
                            },
                            {
                                id: 'quit',
                                text: T('Tray.Quit'),
                                action: () =>
                                {
                                    void getCurrentWindow().close();
                                }
                            }
                        ]
                    });

                    await TrayIcon.new({ menu: AppTrayMenu, icon: AppIcon });
                }
            };

            void AsyncTask();
        }

        if (Account.IsLogged())
        {
            SetPage(<InvitePage />);
        }
        else
        {
            Context.SetPage(<SplashPage />);
        }

        return () =>
        {
            EventMap.Off('App.Page', AppPageHandler);
        };
    }, [ ]);

    return <>

        {
            Page
        }

        <ModalLayout />

        <ToastLayout />

    </>;
}

document.addEventListener('keydown', (Ev) =>
{
    /*
    if (Ev.key === 'F3' || Ev.key === 'F5' || Ev.key === 'F7' || Ev.ctrlKey && Ev.key === 'r')
    {
        Ev.preventDefault();
    }
    */
});

document.addEventListener('contextmenu', (Ev) =>
{
    Ev.preventDefault();
});

const AppDOM = document.querySelector('#App');

if (AppDOM)
{
    await Language.Initialize();

    createRoot(AppDOM).render(<Application />);
}
