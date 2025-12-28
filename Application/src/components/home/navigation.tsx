import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { PiBrowser } from 'react-icons/pi';
import { HiMiniWallet } from 'react-icons/hi2';

import HomeNavigation from './home';
import WalletNavigation from './wallet';
import BrowserNavigation from './browser';

import Context from '../../utility/context';

import { T } from '../../utility/language';

export default function Navigation()
{
    const [ Nav, SetNav ] = useState<NavigationMap>('HOME');

    const OnClickNav = (ID: NavigationMap) =>
    {
        SetNav(ID);

        switch (ID)
        {
            case 'WALLET':
            {
                Context.SetHomePage(WalletNavigation);

                break;
            }
            case 'HOME':
            {
                Context.SetHomePage(HomeNavigation);

                break;
            }
            case 'BROWSER':
            {
                Context.SetHomePage(BrowserNavigation);

                break;
            }
        }
    };

    return (
        <div className='absolute bottom-0 m-4 flex h-[56px] items-center justify-center gap-[16px] rounded-full border border-base-border bg-base-secondary/50 px-[4px] backdrop-blur-sm'>

            <div
                className={ `flex h-[48px] w-[80px] cursor-pointer flex-col items-center justify-center gap-[2px] rounded-full ${ Nav === 'WALLET' && 'bg-black/10 backdrop-blur-sm' }` }
                onClick={ () => OnClickNav('WALLET') }>

                <HiMiniWallet className={ `size-[20px] ${ Nav === 'WALLET' ? 'text-base-reverse' : 'text-base-text/50' }` } />

                <div className={ `text-[12px] ${ Nav === 'WALLET' ? 'text-base-reverse' : 'text-base-text/50' }` }>
                    {
                        T('Home.Wallet')
                    }

                </div>

            </div>

            <div
                className={ `flex h-[48px] w-[80px] cursor-pointer flex-col items-center justify-center gap-[2px] rounded-full ${ Nav === 'HOME' && 'bg-black/10 backdrop-blur-sm' }` }
                onClick={ () => OnClickNav('HOME') }>

                <FaHome className={ `size-[20px] ${ Nav === 'HOME' ? 'text-base-reverse' : 'text-base-text/50' }` } />

                <div className={ `text-[12px] ${ Nav === 'HOME' ? 'text-base-reverse' : 'text-base-text/50' }` }>

                    {
                        T('Home.Home')
                    }

                </div>

            </div>

            <div
                className={ `flex h-[48px] w-[80px] cursor-pointer flex-col items-center justify-center gap-[2px] rounded-full ${ Nav === 'BROWSER' && 'bg-black/10 backdrop-blur-sm' }` }
                onClick={ () => OnClickNav('BROWSER') }>

                <PiBrowser className={ `size-[20px] ${ Nav === 'BROWSER' ? 'text-base-reverse' : 'text-base-text/50' }` } />

                <div className={ `text-[12px] ${ Nav === 'BROWSER' ? 'text-base-reverse' : 'text-base-text/50' }` }>

                    {
                        T('Home.Browser')
                    }

                </div>

            </div>

        </div>);
}
