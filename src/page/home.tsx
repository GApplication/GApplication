import { FaLanguage } from 'react-icons/fa6';

import WindowBarComponent from '../components/window_bar';

export default function SplashPage()
{
    return (
        <div className='flex h-screen w-screen'>

            <WindowBarComponent />

            <div className='m-[16px] flex h-[40px] cursor-pointer items-center rounded-[8px] border border-gray-300 bg-gray-200'>

                <FaLanguage className='m-[8px] size-[24px] text-black' />

                <div className='h-full w-[1px] bg-gray-300' />

                <div className='px-[8px] text-[13px] text-primary1'>

                    English

                </div>

            </div>

        </div>
    );
}
