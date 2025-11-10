import { Menu } from '@tauri-apps/api/menu';
import { createRoot } from 'react-dom/client';
import { TrayIcon } from '@tauri-apps/api/tray';
import { platform } from '@tauri-apps/plugin-os';
import { useState, useEffect, type JSX } from 'react';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { getCurrentWindow } from '@tauri-apps/api/window';

import InvitePage from './page/invite';

import ModalService from './service/modal';
import ToastService from './service/toast';

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
            // SetPage(<HomePage />);
        }
        else
        {
            Context.SetPage(<InvitePage />);
        }

        const AppPageHandler = (Component: JSX.Element) =>
        {
            SetPage(Component);
        };

        EventMap.On('AppPage', AppPageHandler);

        return () =>
        {
            EventMap.Off('AppPage', AppPageHandler);
        };
    }, [ ]);

    return <>

        {
            Page
        }

        <ModalService />

        <ToastService />

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
