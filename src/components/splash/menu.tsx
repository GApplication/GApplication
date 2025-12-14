import { useState } from 'react';
import { motion } from 'motion/react';
import { MdClose } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { LuWallet } from 'react-icons/lu';
import { FaSignature } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

import Context from '../../utility/context';

import { T } from '../../utility/language';

export default function MenuModal({ ID = 0 }: { readonly ID: number })
{
    const [ IsClose, SetIsClose ] = useState(false);

    return <motion.div
        animate={ { y: IsClose ? '100%' : '0%' } }
        className='flex h-full w-full'
        initial={ { y: '100%' } }
        onAnimationComplete={ () => { if (IsClose) Context.CloseModal(ID); } }
        transition={ { duration: 0.2 } }>

        <div className='flex w-full flex-1 flex-col items-center gap-[16px] bg-base'>

            <div className='h-[72px] w-full p-[16px]'>

                <button
                    className='group ml-auto flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-border outline-base-outline duration-200 hover:bg-base-secondary'
                    onClick={ () => { SetIsClose(true); } }>

                    <MdClose className='m-[8px] size-[24px] text-base-text/75 duration-200 group-hover:text-base-text' />

                </button>

            </div>

            <div className='flex flex-col gap-[8px] text-center'>

                <div className='text-[20px] font-bold text-base-text'>

                    {
                        T('Splash.MenuModal.Header')
                    }

                </div>

                <div className='text-[15px] text-base-text/50'>

                    {
                        T('Splash.MenuModal.Description')
                    }

                </div>

            </div>

            <button className='group mx-[24px] flex h-[80px] cursor-pointer items-center gap-[8px] rounded-[8px] border border-base-border bg-base-secondary/25 p-[8px] outline-base-outline duration-200 hover:bg-base-secondary/50'>

                <LuWallet className='m-[8px] min-h-[24px] min-w-[24px] text-base-text/50 duration-200 group-hover:text-base-text' />

                <div className='flex flex-col gap-[4px] text-left'>

                    <div className='text-[14px] text-base-text'>

                        {
                            T('Splash.MenuModal.Wallet')
                        }

                    </div>

                    <div className='text-[13px] text-base-text/50'>

                        {
                            T('Splash.MenuModal.WalletDescription')
                        }

                    </div>

                </div>

                <IoIosArrowForward className='min-h-[24px] min-w-[24px] text-base-text/50 duration-200 group-hover:text-base-text' />

            </button>

            <button className='group mx-[24px] flex h-[80px] cursor-pointer items-center gap-[8px] rounded-[8px] border border-base-border bg-base-secondary/25 p-[8px] outline-base-outline duration-200 hover:bg-base-secondary/50'>

                <FaSignature className='m-[8px] min-h-[24px] min-w-[24px] text-base-text/50 duration-200 group-hover:text-base-text' />

                <div className='flex flex-col gap-[4px] text-left'>

                    <div className='text-[14px] text-base-text'>

                        {
                            T('Splash.MenuModal.Signer')
                        }

                    </div>

                    <div className='text-[13px] text-base-text/50'>

                        {
                            T('Splash.MenuModal.SignerDescription')
                        }

                    </div>

                </div>

                <IoIosArrowForward className='min-h-[24px] min-w-[24px] text-base-text/50 duration-200 group-hover:text-base-text' />

            </button>

            <div className='text-[15px] text-base-text/50'>

                {
                    T('Splash.MenuModal.Option')
                }

            </div>

            <button className='group mx-[24px] flex h-[80px] cursor-pointer items-center gap-[8px] rounded-[8px] border border-base-border bg-base-secondary/25 p-[8px] outline-base-outline duration-200 hover:bg-base-secondary/50'>

                <GoSearch className='m-[8px] min-h-[24px] min-w-[24px] text-base-text/50 duration-200 group-hover:text-base-text' />

                <div className='flex flex-col gap-[4px] text-left'>

                    <div className='text-[14px] text-base-text'>

                        {
                            T('Splash.MenuModal.Watch')
                        }

                    </div>

                    <div className='text-[13px] text-base-text/50'>

                        {
                            T('Splash.MenuModal.WatchDescription')
                        }

                    </div>

                </div>

                <IoIosArrowForward className='min-h-[24px] min-w-[24px] text-base-text/50 duration-200 group-hover:text-base-text' />

            </button>

        </div>

    </motion.div>;
}
