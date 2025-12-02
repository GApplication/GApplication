import { GrLanguage } from 'react-icons/gr';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiPaintBrushHousehold } from 'react-icons/pi';

import { T } from '../utility/language';

import Icon from '../assets/image/t.jpg';
import Package from '../../package.json';

import 'swiper/css';
import 'swiper/css/pagination';

export default function SplashPage()
{
    return (
        <div className='flex min-h-[668px] min-w-[360px] flex-col'>

            <div className='flex w-full justify-between p-[16px]'>

                <div className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-100-border shadow-sm'>

                    <GrLanguage className='m-[8px] size-[24px] text-base-100-text/70 duration-200 group-hover:text-base-100-text' />

                    <div className='h-full w-[1px] bg-base-100-border' />

                    <div className='px-[8px] text-[12px] font-bold text-base-100-text/70 duration-200 group-hover:text-base-100-text'>

                        {
                            T('Splash.Language')
                        }

                    </div>

                </div>

                <div className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-100-border shadow-sm'>

                    <PiPaintBrushHousehold className='m-[8px] size-[24px] text-base-100-text/70 duration-200 group-hover:text-base-100-text' />

                </div>

            </div>

            <div className='flex w-screen flex-1'>

                <Swiper
                    modules={ [ Pagination ] }
                    pagination={ { clickable: true } }>

                    <SwiperSlide>

                        <div className='flex flex-1 cursor-pointer flex-col justify-center gap-[16px]'>

                            <img src={ Icon } className='px-[16px]' />

                            <div className='text-center text-[18px] font-bold'>

                                11Global Application11

                            </div>

                            <div className='mx-[16px] flex text-center text-[14px] font-bold'>

                                A secure, non-custodial wallet that gives you full control of your crypto and digital assets with privacy-first features.

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide>

                        <div className='flex flex-1 cursor-pointer flex-col justify-center gap-[16px]'>

                            <img src={ Icon } className='px-[16px]' />

                            <div className='text-center text-[18px] font-bold'>

                                22Global Application22

                            </div>

                            <div className='mx-[16px] flex text-center text-[14px] font-bold'>

                                A secure, non-custodial wallet that gives you full control of your crypto and digital assets with privacy-first features.

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide>

                        <div className='flex flex-1 cursor-pointer flex-col justify-center gap-[16px]'>

                            <img src={ Icon } className='px-[16px]' />

                            <div className='text-center text-[18px] font-bold'>

                                33Global Application33

                            </div>

                            <div className='mx-[16px] flex text-center text-[14px] font-bold'>

                                A secure, non-custodial wallet that gives you full control of your crypto and digital assets with privacy-first features.

                            </div>

                        </div>

                    </SwiperSlide>

                </Swiper>

            </div>

            <div className='mx-[16px] mt-[8px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] bg-primary/80 text-[15px] font-bold text-white shadow-md duration-200 hover:bg-primary'>

                {
                    T('Splash.Create')
                }

            </div>

            <div className='mx-[16px] my-[8px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-base-100-border bg-base-100 text-[14px] font-bold text-base-100-text/70 shadow-sm duration-200 hover:bg-base-100-border/25 hover:text-base-100-text'>

                {
                    T('Splash.Import')
                }

            </div>

            <div className='m-[8px] text-center text-[12px] text-base-100-text/30'>

                {
                    T('Splash.Version', Package.version)
                }

            </div>

        </div>
    );
}
