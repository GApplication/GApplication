import type { JSX } from 'react/jsx-runtime';

import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';

import SplashPage from './page/splash';

import AccountService from './service/account';

import Language from './utility/language';

import './app.css';

function App()
{
    const [ Page, SetPage ] = useState<JSX.Element>();

    useEffect(() =>
    {
        if (AccountService.IsLogged())
        {
            return;
        }

        SetPage(<SplashPage />);
    }, [ ]);

    return Page;
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
    // FixMe: Get Language

    await Language.SetLang('us');

    createRoot(AppDOM).render(<App />);
}
