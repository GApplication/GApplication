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

import Account from './core/account';

import Theme from './utility/theme';
import Context from './utility/context';
import Language from './utility/language';

import { T } from './utility/language';

import './app.css';

/**
 * Application - Root React application component that initializes platform integrations
 * and opens the initial page (home or splash)
 * @returns {JSX.Element} The root application component
 */
function Application()
{
    useEffect(() =>
    {
        if (platform() === 'windows')
        {
            /**
             * AsyncTask - Performs async platform-specific initialization (tray/menu/icon)
             */
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
                                text: T('App.Tray.Open'),
                                action: () =>
                                {
                                    getCurrentWindow().show();
                                }
                            },
                            {
                                id: 'quit',
                                text: T('App.Tray.Quit'),
                                action: () =>
                                {
                                    getCurrentWindow().close();
                                }
                            }
                        ]
                    };

                    const AppTrayMenu = await Menu.new(TryMenu);

                    await TrayIcon.new({ menu: AppTrayMenu, icon: AppIcon, showMenuOnLeftClick: false });
                }
            };

            AsyncTask();
        }

        const AsyncTaskAccount = async() =>
        {
            if (await Account.IsLogged())
            {
                Context.OpenPage(HomePage, { ID: 1 });
            }
            else
            {
                Context.OpenPage(SplashPage, { ID: 1 });
            }
        };

        AsyncTaskAccount();
    }, [ ]);

    useEffect(() =>
    {
        function MessageHandler(event: MessageEvent)
        {
            console.log(event.origin);
            console.log(event.data.type);
            console.log(event.data.payload);
        }

        window.addEventListener('message', MessageHandler);

        return () =>
        {
            window.removeEventListener('message', MessageHandler);
        };
    }, []);

    return <>

        <PageLayout />

        <ModalLayout />

        <ToastLayout />

    </>;
}

/**
 * Prevent certain keyboard shortcuts from triggering browser behavior
 */
document.addEventListener('keydown', (_Ev) =>
{
    /*
    if (_Ev.key === 'F3' || _Ev.key === 'F5' || _Ev.key === 'F7' || _Ev.ctrlKey && _Ev.key === 'r')
    {
        _Ev.preventDefault();
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
    await Theme.Initialize();

    await Language.Initialize();

    createRoot(AppDOM).render(<Application />);
}
