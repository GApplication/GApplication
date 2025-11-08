import * as OS from '@tauri-apps/plugin-os';

import { useEffect, useState } from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { BsTwitterX } from 'react-icons/bs';
import { LuInstagram } from 'react-icons/lu';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaLock, FaChevronDown, FaDiscord } from 'react-icons/fa6';

import LoadingComponent from '../components/loading';
import WarningComponent from '../components/toast/warning';

import { Toast } from '../service/toast';

import API from '../utility/api';
import Account from '../utility/account';

import { T } from '../utility/language';

const OnOpenSocial = (App: 'instagram' | 'x' | 'telegram' | 'discord' | 'website') =>
{
    // Handle Opening App For Each Platform.

    console.log('OnOpenSocial', App);
};

export default function SplashPage()
{
    const [ Loading, SetLoading ] = useState(false);
    const [ InviteCode, SetInviteCode ] = useState('');
    const [ Language, SetLanguage ] = useState<LanguageType>('us');

    const OnClickInviation = () =>
    {
        if (Loading)
        {
            return;
        }

        if (InviteCode.length < 5)
        {
            Toast(<WarningComponent Message={ T('Splash.ErrorInviationCode') } />);

            return;
        }

        SetLoading(true);

        API.Invite(InviteCode, (Response) =>
        {
            SetLoading(false);

            Toast(<WarningComponent Message={ `InviteCode: ${ InviteCode }`} />);
        });
    };

    useEffect(() =>
    {
        if (Account.IsNewInstall())
        {
            const AsyncCall = async() =>
            {
                const Agent =
                {
                    Arch: OS.arch(),
                    Family: OS.family(),
                    Hostname: await OS.hostname(),
                    Locale: await OS.locale(),
                    Platform: OS.platform(),
                    Type: OS.type(),
                    Version: OS.version()
                };

                API.Install(JSON.stringify(Agent), (Response) =>
                {
                    if (Response === undefined)
                    {
                        return;
                    }

                    if (Response.Result === 0)
                    {
                        Account.SetInstallTime();
                    }
                });
            };

            AsyncCall();
        }
    }, [ ]);

    return (
        <div className="flex w-screen h-screen justify-center bg-linear-to-tl from-cyan-500/50 to-blue-500/50">

            <div className="bg-pattern-28 size-full absolute" />

            <div className="flex w-[360px] flex-col items-center gap-[16px] z-1 bg-content">

                <FaLock className="size-[160px] mt-[32px] p-[8px] rounded-[8px] border border-border/50" />

                <div className="text-[24px] font-bold p-[8px] rounded-[8px] border border-border/50">

                    {
                        T('Splash.Header')
                    }

                </div>

                <div className="flex flex-col w-full gap-[8px] px-[16px]">

                    <div className="w-fit px-[8px] py-[6px] rounded-[8px] border border-border/50">

                        {
                            T('Splash.Language')
                        }

                    </div>

                    <div
                        className="flex h-[48px] cursor-pointer items-center gap-[8px] px-[16px] rounded-[8px] border border-border/50 hover:bg-border/10 transition focus:outline outline-outline"
                        tabIndex={ 1 }>

                        <div className={ `fi fi-${ Language } size-[24px]` } />

                        <div className="flex-1 text-[14px]">

                            {
                                T('Common.English')
                            }

                        </div>

                        <FaChevronDown className="size-[16px]" />

                    </div>

                </div>

                <div className="flex flex-col w-full gap-[8px] px-[16px]">

                    <div className="w-fit px-[8px] py-[6px] rounded-[8px] border border-border/50">

                        {
                            T('Splash.InviationCode')
                        }

                    </div>

                    <input
                        className="flex h-[48px] text-center px-[8px] rounded-[8px] border border-border/50 outline-outline focus:bg-border/10 transition"
                        maxLength={ 32 }
                        placeholder={ T('Splash.InviationCode') }
                        onChange={ (e) => SetInviteCode(e.target.value) }
                        tabIndex={ 2 }
                        value={ InviteCode }
                        type="text" />

                </div>

                <div className="flex justify-center m-[8px] h-[48px] w-[160px] rounded-[8px] bg-primary1 hover:bg-primary2 active:bg-primary3 transition">

                    <button
                        className={ `flex flex-1 justify-center items-center rounded-[8px] text-[16px] font-semibold text-white ${ !Loading && 'cursor-pointer' } focus:outline outline-outline` }
                        onClick={ OnClickInviation }
                        tabIndex={ 3 }>

                        {
                            Loading ? <LoadingComponent /> : T('Splash.Continue')
                        }

                    </button>

                </div>

                <div className="flex w-full relative justify-center h-[30px]">

                    <div className="absolute h-[1px] w-[calc(100%-32px)] bg-box/50 top-[15px] left-[16px]" />

                    <div className="bg-box/25 rounded-[8px] p-[8px] z-2 text-black">

                        {
                            T('Splash.ContactWithUs')
                        }

                    </div>

                </div>

                <div className="flex flex-wrap justify-evenly mt-[16px] gap-[16px]">

                    <button
                        className="bg-box/35 hover:bg-primary1 flex justify-center items-center size-[40px] rounded-[8px] cursor-pointer group transition focus:outline outline-outline"
                        onClick={ () => OnOpenSocial('instagram') }
                        tabIndex={ 4 }>

                        <LuInstagram className="size-[24px] group-hover:text-white transition" />

                    </button>

                    <button
                        className="bg-box/35 hover:bg-primary1 flex justify-center items-center size-[40px] rounded-[8px] cursor-pointer group transition focus:outline outline-outline"
                        onClick={ () => OnOpenSocial('x') }
                        tabIndex={ 5 }>

                        <BsTwitterX className="size-[24px] group-hover:text-white transition" />

                    </button>

                    <button
                        className="bg-box/35 hover:bg-primary1 flex justify-center items-center size-[40px] rounded-[8px] cursor-pointer group transition focus:outline outline-outline"
                        onClick={ () => OnOpenSocial('telegram') }
                        tabIndex={ 6 }>

                        <FaTelegramPlane className="size-[24px] group-hover:text-white transition" />

                    </button>

                    <button
                        className="bg-box/35 hover:bg-primary1 flex justify-center items-center size-[40px] rounded-[8px] cursor-pointer group transition focus:outline outline-outline"
                        onClick={ () => OnOpenSocial('discord') }
                        tabIndex={ 7 }>

                        <FaDiscord className="size-[24px] group-hover:text-white transition" />

                    </button>

                    <button
                        className="bg-box/35 hover:bg-primary1 flex justify-center items-center size-[40px] rounded-[8px] cursor-pointer group transition focus:outline outline-outline"
                        onClick={ () => OnOpenSocial('website') }
                        tabIndex={ 8 }>

                        <TfiWorld className="size-[24px] group-hover:text-white transition" />

                    </button>

                </div>

            </div>

        </div>
    );
}
