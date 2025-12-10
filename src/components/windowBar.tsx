import type { JSX } from 'react';

import { FaMinus, FaX } from 'react-icons/fa6';
import { platform } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { T } from '../utility/language';

const OnClickMinimize = () =>
{
    void getCurrentWindow().minimize();
};

const OnClickMaximize = () =>
{
    void getCurrentWindow().maximize();
};

const OnClickClose = () =>
{
    void getCurrentWindow().hide();
};

export default function WindowBar(): JSX.Element | undefined
{
    if (platform() !== 'windows')
    {
        return;
    }

    return (
        <div className='absolute top-[0px] z-4 flex h-[32px] w-full items-center border-b border-base-border bg-base'>

            <div
                className='m-[8px] flex h-full flex-1 cursor-pointer items-center text-[14px] font-semibold text-base-text/50'
                data-tauri-drag-region
                onDoubleClick={ OnClickMaximize }>

                {
                    T('App.Name')
                }

            </div>

            <div className='m-[8px] flex gap-[4px]'>

                <div
                    className='group flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] duration-200 hover:bg-base-secondary'
                    onClick={ OnClickMinimize }>

                    <FaMinus className='size-[16px] text-base-text/25 duration-200 group-hover:text-base-text/50' />

                </div>

                <div
                    className='group flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] duration-200 hover:bg-base-secondary'
                    onClick={ OnClickClose }>

                    <FaX className='size-[16px] text-base-text/25 duration-200 group-hover:text-base-text/50' />

                </div>

            </div>

        </div>
    );
}
