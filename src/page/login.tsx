import * as OS from '@tauri-apps/plugin-os';

import { TfiWorld } from 'react-icons/tfi';
import { useEffect, useState } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { LuInstagram } from 'react-icons/lu';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaLock, FaChevronDown, FaDiscord } from 'react-icons/fa6';

import LoginPage from '../page/login';

import LoadingComponent from '../components/loading';
import LanguageModal from '../components/modal/language';
import WindowBarComponent from '../components/windowbar';
import WarningComponent from '../components/toast/warning';

import { Toast } from '../layout/toast';
import { Modal } from '../layout/modal';

import API from '../utility/api';
import Config from '../utility/config';
import AppUtility from '../utility/context';
import Account from '../utility/account';

import LanguageUtility, { T } from '../utility/language';

export default function InvitaePage()
{
    const Language = LanguageUtility.GetLang();

    const [ Loading, SetLoading ] = useState(false);
    const [ InviteCode, SetInviteCode ] = useState('');

    const OnClickLanguage = () =>
    {
        Modal(<LanguageModal />);
    };

    const OnClickInviation = () =>
    {
        if (Loading)
        {
            return;
        }

        if (InviteCode === 'AAA')
        {
            AppUtility.SetPage(<LoginPage />);

            return;
        }

        if (InviteCode.length < 5)
        {
            Toast(<WarningComponent Message={ T('Splash.Error.InviationCode') } />);

            return;
        }

        SetLoading(true);

        API.Invite(InviteCode, (Response) =>
        {
            SetLoading(false);

            if (Response === undefined)
            {
                Toast(<WarningComponent Message={ T('Error.Internet') } />);

                return;
            }

            console.log('Go To Next Page');
        });
    };

    useEffect(() =>
    {
        //
    }, [ ]);

    return (
        <div className='w-screen h-screen justify-center bg-linear-to-tl from-cyan-500/50 to-blue-500/50'>

            <WindowBarComponent />

            <div className={ `flex w-[360px] flex-col items-center gap-[16px] z-1 bg-content h-full ${ OS.platform() === 'windows' && 'pt-[40px]' }` }>

                <div className='flex w-full h-[40px] my-[16px] px-[16px]'>

                    <FaLock className='size-[40px] p-[8px] rounded-[8px] border border-border/50 cursor-pointer' />

                    <div className='flex-1 flex justify-center items-center font-bold text-[18px]'>

                        {
                            T('Wallet.Login')
                        }

                    </div>

                    <FaLock className='size-[40px] p-[8px] rounded-[8px] border border-border/50' />

                </div>

                <div className='flex flex-wrap gap-[16px] justify-center bg-amber-50 mx-[16px]'>

                    <input
                        className='flex h-[40px] text-center px-[8px] rounded-[8px] border border-border/50 outline-outline focus:bg-border/10 transition'
                        maxLength={ 32 }
                        onChange={ (e) => SetInviteCode(e.target.value) }
                        placeholder={ T('Splash.InviationCode') }
                        tabIndex={ 2 }
                        type='text'
                        value={ InviteCode } />

                    <input
                        className='flex h-[48px] text-center px-[8px] rounded-[8px] border border-border/50 outline-outline focus:bg-border/10 transition'
                        maxLength={ 32 }
                        onChange={ (e) => SetInviteCode(e.target.value) }
                        placeholder={ T('Splash.InviationCode') }
                        tabIndex={ 2 }
                        type='text'
                        value={ InviteCode } />

                    <input
                        className='flex h-[48px] text-center px-[8px] rounded-[8px] border border-border/50 outline-outline focus:bg-border/10 transition'
                        maxLength={ 32 }
                        onChange={ (e) => SetInviteCode(e.target.value) }
                        placeholder={ T('Splash.InviationCode') }
                        tabIndex={ 2 }
                        type='text'
                        value={ InviteCode } />

                </div>

            </div>

        </div>
    );
}
