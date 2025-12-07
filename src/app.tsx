import type { MenuOptions } from '@tauri-apps/api/menu';

import { useEffect } from 'react';
import { Menu } from '@tauri-apps/api/menu';
import { createRoot } from 'react-dom/client';
import { TrayIcon } from '@tauri-apps/api/tray';
import { platform } from '@tauri-apps/plugin-os';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { getCurrentWindow } from '@tauri-apps/api/window';

import HomePage from './page/home';
import SplashPage from './page/splash';

import PageLayout from './layout/page';
import ModalLayout from './layout/modal';
import ToastLayout from './layout/toast';

import Account from './utility/account';
import Context from './utility/context';

import Language, { T } from './utility/language';

import './app.css';

function Application()
{
    useEffect(() =>
    {
        if (platform() === 'windows')
        {
            const AsyncTask = async() =>
            {
                const AppIcon = await defaultWindowIcon();

                if (AppIcon)
                {
                    const TryMenu: MenuOptions =
                    {
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
                    };

                    const AppTrayMenu = await Menu.new(TryMenu);

                    await TrayIcon.new({ menu: AppTrayMenu, icon: AppIcon });
                }
            };

            void AsyncTask();
        }

        if (Account.IsLogged())
        {
            Context.OpenPage(<HomePage />);
        }
        else
        {
            Context.OpenPage(<SplashPage />);
        }
    }, [ ]);

    return <>

        <PageLayout />

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
