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
        <div className='absolute top-[0px] z-4 flex h-[32px] w-full items-center border-b border-content-border bg-content'>

            <div
                className='m-[8px] flex h-full flex-1 cursor-pointer items-center text-[14px] font-semibold text-content-text/50'
                onDoubleClick={ OnClickMaximize }
                data-tauri-drag-region>

                {
                    T('App.Name')
                }

            </div>

            <div className='m-[8px] flex gap-[4px]'>

                <div
                    className='flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] duration-200 hover:bg-content-hover'
                    onClick={ OnClickMinimize }>

                    <FaMinus className='size-[16px] text-content-text/25' />

                </div>

                <div
                    className='flex size-[24px] cursor-pointer items-center justify-center rounded-[4px] duration-200 hover:bg-content-hover'
                    onClick={ OnClickClose }>

                    <FaX className='size-[16px] text-content-text/25' />

                </div>

            </div>

        </div>
    );
}
