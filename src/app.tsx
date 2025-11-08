import { createRoot } from 'react-dom/client';
import { useState, useEffect, type JSX } from 'react';

import SplashPage from './page/splash';

import ToastService from './service/toast';

import Account from './utility/account';
import Language from './utility/language';

import './app.css';

function App()
{
    const [ Page, SetPage ] = useState<JSX.Element>();

    useEffect(() =>
    {
        if (Account.IsLogged())
        {
            return;
        }

        SetPage(<SplashPage />);
    }, [ ]);

    return <>
        {
            Page
        }

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

    createRoot(AppDOM).render(<App />);
}
