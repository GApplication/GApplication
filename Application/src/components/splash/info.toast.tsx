import { useState } from 'react';
import { motion } from 'motion/react';
import { MdClose } from 'react-icons/md';
import { IoIosInformationCircleOutline } from 'react-icons/io';

import Context from '../../utility/context';

/**
 * InfoToast - A small informational toast component with auto-dismiss
 * @param {number} ID - Toast instance identifier
 * @param {number} Delay - Milliseconds before auto-dismiss
 * @param {string} Message - The message text to display
 * @returns {JSX.Element} The info toast component
 */
export default function InfoToast({ ID, Delay, Message }: Readonly<{ ID: number; Delay: number; Message: string }>)
{
    const [ IsClose, SetIsClose ] = useState(false);

    return <motion.div
        animate={ { opacity: IsClose ? 0 : 1 } }
        className='pointer-events-auto mx-[16px] mt-[16px] flex flex-col overflow-hidden rounded-[4px] bg-blue-100'
        initial={ { opacity: 0 } }
        onAnimationComplete={ () => { if (IsClose) Context.CloseToast(ID); } }
        transition={ { duration: 0.2 } }>

        <motion.div
            animate={ { width: '100%' } }
            className='h-[2px] bg-blue-300'
            initial={ { width: '0%' } }
            onAnimationComplete={ () => { SetIsClose(true); } }
            transition={ { duration: Delay / 1000 } } />

        <div className='flex gap-[8px] p-[8px] text-blue-500'>

            <IoIosInformationCircleOutline className='size-[32px] justify-center p-[4px]' />

            <div className='flex-1 py-[8px] text-[14px] leading-[20px]'>

                {
                    Message
                }

            </div>

            <MdClose
                className='size-[24px] cursor-pointer items-center justify-center rounded-[8px] p-[2px] duration-200 hover:bg-blue-200'
                onClick={ () => { SetIsClose(true); } } />

        </div>

    </motion.div>;
}
