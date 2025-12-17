import type { SwiperClass } from 'swiper/react';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';

import Wallet from '../../core/wallet';

import Context from '../../utility/context';

import { T } from '../../utility/language';

/**
 * PasscodeModal - A modal component for entering and confirming a passcode
 * @param {number} ID - The unique identifier for the modal instance
 * @param {string} Phrase - The existing mnemonic phrase (empty if creating new wallet)
 * @returns {JSX.Element} The rendered passcode modal component
 */
export default function PasscodeModal({ ID, Phrase }: Readonly<{ ID: number; Phrase: string }>)
{
    const SwiperRef = useRef<SwiperClass>(undefined);

    const [ Counter, SetCounter ] = useState(0);
    const [ IsClose, SetIsClose ] = useState(false);

    /**
     * OnPush - Handles passcode digit input and validation
     * Manages the passcode entry flow, validates input, and triggers wallet generation
     * @param {string} Value - The digit/action value entered ('0'-'9' for digits)
     */
    const OnPush = async(Value: string) =>
    {
        if (Value === '-')
        {
            SwiperRef.current?.slideTo(0);

            SetCounter(0);

            return;
        }

        if (Counter === 3)
        {
            SwiperRef.current?.slideTo(1);
        }

        SetCounter((PreviousValue) => PreviousValue + 1);

        if (Counter === 7)
        {
            if (Phrase.length > 0)
            {
                if (Wallet.Validate(Phrase))
                {
                    return;
                }

                // Future: Handle invalid mnemonic validation failure

                return;
            }

            Wallet.Generate();
            
            // Future: Validate Passcode
            // Future: Store Passcode
            // Future: Generate Wallet (only if Phrase not available)
            // Future: Move To Home Page
        }
    };

    return <motion.div
        animate={ { y: IsClose ? '100%' : '0%' } }
        className='flex h-full w-full'
        initial={ { y: '100%' } }
        onAnimationComplete={ () => { if (IsClose) Context.CloseModal(ID); } }
        transition={ { duration: 0.2 } }>

        <div className='flex w-full flex-1 flex-col items-center bg-base'>

            <div className='h-[72px] w-full p-[16px]'>

                <button
                    className='group ml-auto flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-border outline-base-outline duration-200 hover:bg-base-secondary'
                    onClick={ () => { SetIsClose(true); } }>

                    <MdClose className='m-[8px] size-[24px] text-base-text/75 duration-200 group-hover:text-base-text' />

                </button>

            </div>

            <Swiper
                allowTouchMove={ false }
                className='w-full flex-1 items-center justify-center'
                onSwiper={ (swiper) => SwiperRef.current = swiper }>

                <SwiperSlide className='m-auto flex items-center justify-center'>

                    <div className='flex h-full flex-1 flex-col items-center justify-center gap-[16px]'>

                        <div className='text-[18px] text-base-text'>

                            {
                                T('Splash.PasscodeModal.Password')
                            }

                        </div>

                        <div className='flex gap-[10px]'>

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 0 ? 'bg-primary' : 'bg-base-secondary' }` } />

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 1 ? 'bg-primary' : 'bg-base-secondary' }` } />

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 2 ? 'bg-primary' : 'bg-base-secondary' }` } />

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 3 ? 'bg-primary' : 'bg-base-secondary' }` } />

                        </div>

                    </div>

                </SwiperSlide>

                <SwiperSlide className='m-auto flex items-center justify-center'>

                    <div className='flex h-full flex-1 flex-col items-center justify-center gap-[16px]'>

                        <div className='text-[18px] text-base-text'>

                            {
                                T('Splash.PasscodeModal.Repeat')
                            }

                        </div>

                        <div className='flex gap-[10px]'>

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 4 ? 'bg-primary' : 'bg-base-secondary' }` } />

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 5 ? 'bg-primary' : 'bg-base-secondary' }` } />

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 6 ? 'bg-primary' : 'bg-base-secondary' }` } />

                            <div className={ `size-[10px] rounded-[2px] ${ Counter > 7 ? 'bg-primary' : 'bg-base-secondary' }` } />

                        </div>

                    </div>

                </SwiperSlide>

            </Swiper>

            <div className='grid grid-cols-3 gap-[20px] p-[32px] text-[18px] font-bold text-base-text'>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('1'); } }>

                    {
                        T('1')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('2'); } }>

                    {
                        T('2')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('3'); } }>

                    {
                        T('3')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('4'); } }>

                    {
                        T('4')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('5'); } }>

                    {
                        T('5')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('6'); } }>

                    {
                        T('6')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('7'); } }>

                    {
                        T('7')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('8'); } }>

                    {
                        T('8')
                    }

                </button>

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('9'); } }>

                    {
                        T('9')
                    }

                </button>

                <div className='size-[48px]' />

                <button
                    className='size-[48px] cursor-pointer rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('0'); } }>

                    {
                        T('0')
                    }

                </button>

                <button
                    className='flex size-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-base-border outline-base-outline hover:bg-base-secondary'
                    onClick={ () => { OnPush('-'); } }>

                    <FaArrowLeft className='p-[2px] text-[24px]' />

                </button>

            </div>

        </div>

    </motion.div>;
}
