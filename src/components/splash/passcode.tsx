import type { SwiperClass } from 'swiper/react';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';

import Context from '../../utility/context';

import { T } from '../../utility/language';

export default function PasscodeModal({ ID = 0 }: { readonly ID: number })
{
    const SwiperRef = useRef<SwiperClass>(undefined);

    const [ Counter, SetCounter ] = useState(0);
    const [ IsClose, SetIsClose ] = useState(false);

    const OnPush = (Value: string) =>
    {
        if (Value === '-')
        {
            SetCounter(0);

            return;
        }

        SetCounter((PreviousValue) => PreviousValue + 1);
    };

    return <motion.div
        animate={ { y: IsClose ? '100%' : '0%' } }
        className='flex h-full w-full'
        initial={ { y: '100%' } }
        onAnimationComplete={ () => { if (IsClose) Context.CloseModal(ID); } }
        transition={ { duration: 0.2 } }>

        <div className='flex flex-1 flex-col bg-base'>

            <div className='h-[72px] w-full p-[16px]'>

                <button
                    className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-border outline-base-outline duration-200 hover:bg-base-secondary'
                    onClick={ () => { SetIsClose(true); } }>

                    <MdClose className='m-[8px] size-[24px] text-base-text/75 duration-200 group-hover:text-base-text' />

                </button>

            </div>

            <Swiper
                autoHeight
                onSwiper={ (swiper) => SwiperRef.current = swiper }
                style={ { width: '100%', height: '100%' } }>

                <SwiperSlide style={ { height: '100%', display: 'flex', justifyContent: 'center' } }>

                    <div className='flex flex-1 flex-col items-center justify-center'>

                        <div className='p-[16px] text-[16px] font-bold text-base-text'>

                            {
                                T(`Passcode.Password`)
                            }

                        </div>

                        <div className='flex justify-center gap-[8px]'>

                            <div className={ `size-[10px] rounded-[2px] bg-base-secondary ${ Counter > 0 && 'bg-primary' }` } />

                            <div className={ `size-[10px] rounded-[2px] bg-base-secondary ${ Counter > 1 && 'bg-primary' }` } />

                            <div className={ `size-[10px] rounded-[2px] bg-base-secondary ${ Counter > 2 && 'bg-primary' }` } />

                            <div className={ `size-[10px] rounded-[2px] bg-base-secondary ${ Counter > 3 && 'bg-primary' }` } />

                        </div>

                    </div>

                </SwiperSlide>

            </Swiper>

            <div className='mx-auto grid grid-cols-3 gap-[20px] p-[32px] text-[18px] font-bold text-base-text'>

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
