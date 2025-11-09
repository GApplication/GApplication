import { useEffect, useState } from 'react';
import { MdClose, MdErrorOutline } from 'react-icons/md';

import { ToastClose } from '../../service/toast';
import { motion } from 'motion/react';

export default function Warning({ ID, Delay, Message }: { readonly ID?: number; readonly Delay?: number; readonly Message: string })
{
    const [ IsClose, SetIsClose ] = useState(false);

    const OnClickClose = () =>
    {
        SetIsClose(true);

        setTimeout(() => ToastClose(ID ?? 0), 260);
    };

    useEffect(() =>
    {
        const T = setTimeout(() => OnClickClose(), Delay);

        return () =>
        {
            clearTimeout(T);
        };
    }, [ ]);

    return <motion.div
        animate={ { opacity: IsClose ? 0 : 1 } }
        className='flex w-[328px] h-[58px] mt-[16px] rounded-[8px] items-center gap-[8px] p-[8px] bg-yellow-50 border border-yellow-300 pointer-events-auto'
        exit={ { opacity: 0 } }
        initial={ { opacity: 0 } }
        transition={ { duration: 0.25 } }>

        <MdErrorOutline className='min-w-[24px] min-h-[24px] text-yellow-500' />

        <div className='w-full text-yellow-800 text-ellipsis overflow-hidden'>

            {
                Message
            }

        </div>

        <MdClose
            className='min-w-[24px] min-h-[24px] p-[3px] cursor-pointer text-black transition bg-yellow-200/25 hover:bg-yellow-200/50 hover:text-black rounded-[8px]'
            onClick={ OnClickClose } />

    </motion.div>;
}
