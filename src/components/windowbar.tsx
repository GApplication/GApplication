import type { JSX } from 'react';

import { FiMinus, FiX } from 'react-icons/fi';
import { platform } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { T } from '../utility/language';

const OnClickMinimize = () =>
{
    void getCurrentWindow().minimize();
};

const OnClickClose = () =>
{
    void getCurrentWindow().hide();
};

export default function WindowBar(): JSX.Element | undefined
{
    if (platform() !== 'windows')
    {
        return undefined;
    }

    return (
        <div className='border-b-border/25 fixed z-3 flex h-[40px] w-full items-center border-b top-[0px] bg-content'>

            <div
                className='m-[8px] flex h-full flex-1 cursor-pointer items-center pt-[5px] text-[14px] font-semibold'
                data-tauri-drag-region>

                {
                    T('App.Name')
                }

            </div>

            <div className='m-[8px] flex flex-row gap-[8px]'>

                <div
                    className='hover:bg-box/50 flex size-[32px] cursor-pointer items-center justify-center rounded-[8px] transition-all duration-200'
                    onClick={ OnClickMinimize }>

                    <FiMinus className='size-[24px]' />

                </div>

                <div
                    className='flex size-[32px] cursor-pointer items-center justify-center rounded-[8px] transition-all duration-200 hover:bg-box/50'
                    onClick={ OnClickClose }>

                    <FiX className='size-[24px]' />

                </div>

            </div>

        </div>
    );
}
