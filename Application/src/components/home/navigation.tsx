import { GrLanguage } from 'react-icons/gr';
import { PiPaintBrushHousehold } from 'react-icons/pi';

import { T } from '../../utility/language';

export default function Navigation()
{
    return (
        <div className='absolute bottom-0 m-4 flex h-[56px] items-center justify-center gap-[16px] rounded-[8px] bg-amber-500 p-[8px]'>

            <div className='flex flex-col items-center justify-center rounded-[8px] bg-red-500 px-[8px] py-[4px]'>

                <PiPaintBrushHousehold className='size-[24px]' />

                <div className='text-[12px]'>

                    {
                        T('Home.Profile')
                    }

                </div>

            </div>

            <div className='flex flex-col items-center justify-center rounded-[8px] bg-red-500 px-[8px] py-[4px]'>

                <PiPaintBrushHousehold className='size-[24px]' />

                <div className='text-[12px]'>

                    {
                        T('Home.Home')
                    }

                </div>

            </div>

            <div className='flex flex-col items-center justify-center rounded-[8px] bg-red-500 px-[8px] py-[4px]'>

                <PiPaintBrushHousehold className='size-[24px]' />

                <div className='text-[12px]'>

                    {
                        T('Home.Explore')
                    }

                </div>

            </div>

        </div>);
}
