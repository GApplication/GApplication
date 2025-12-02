import type { JSX } from 'react';

import { platform } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { FaMinus, FaX } from 'react-icons/fa6';

import { T } from '../../utility/language';

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
        <div className='absolute top-[0px] z-4 flex h-[32px] w-full items-center bg-base-100 shadow-sm'>

            <div
                className='m-[8px] flex h-full flex-1 cursor-pointer items-center text-[14px] font-semibold'
                onDoubleClick={ OnClickMaximize }
                data-tauri-drag-region>

                {
                    T('App.Name')
                }

            </div>

            <div className='m-[8px] flex gap-[4px]'>

                <div
                    className='flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] duration-200 hover:bg-base-100-border/50'
                    onClick={ OnClickMinimize }>

                    <FaMinus className='size-[16px] text-base-100-text/25' />

                </div>

                <div
                    className='flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] duration-200 hover:bg-base-100-border/50'
                    onClick={ OnClickClose }>

                    <FaX className='size-[16px] text-base-100-text/25' />

                </div>

            </div>

        </div>
    );
}
