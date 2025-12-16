import type { SwiperClass } from 'swiper/react';

import { useRef, useState } from 'react';
import { GrLanguage } from 'react-icons/gr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiPaintBrushHousehold } from 'react-icons/pi';

import MenuModal from '../components/splash/menu.modal';
import LanguageModal from '../components/splash/language.modal';
import PasscodeModal from '../components/splash/passcode.modal';

import Theme from '../utility/theme';
import Context from '../utility/context';

import { T } from '../utility/language';

import Package from '../../package.json';
import SlideIcon1 from '../assets/image/splash-slide-1.png';
import SlideIcon2 from '../assets/image/splash-slide-2.png';
import SlideIcon3 from '../assets/image/splash-slide-3.png';

import 'swiper/css';

export default function SplashPage()
{
    const SwiperRef = useRef<SwiperClass>(undefined);

    const [ ActiveIndex, SetActiveIndex ] = useState(0);

    return (
        <div className='flex h-full w-full flex-col bg-base'>

            <div className='flex w-full justify-between p-[16px]'>

                <button
                    className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-border outline-base-outline duration-200 hover:bg-base-secondary'
                    onClick={ () => { Context.OpenModal(LanguageModal); } }>

                    <GrLanguage className='m-[8px] size-[24px] text-base-text/75 duration-200 group-hover:text-base-text' />

                    <div className='h-full w-[1px] bg-base-border' />

                    <div className='px-[8px] text-[12px] text-base-text/75 duration-200 group-hover:text-base-text'>

                        {
                            T('Splash.Language')
                        }

                    </div>

                </button>

                <button
                    className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-border outline-base-outline duration-200 hover:bg-base-secondary'
                    onClick={ () => void Theme.Toggle() }>

                    <PiPaintBrushHousehold className='m-[8px] size-[24px] text-base-text/75 duration-200 group-hover:text-base-text' />

                </button>

            </div>

            <div className='flex w-full flex-1 flex-col'>

                <Swiper
                    autoHeight
                    onSlideChange={ (swiper) => { SetActiveIndex(swiper.activeIndex); } }
                    onSwiper={ (swiper) => SwiperRef.current = swiper }
                    style={ { width: '100%', height: '100%' } }>

                    <SwiperSlide style={ { height: '100%', display: 'flex', justifyContent: 'center' } }>

                        <div className='flex cursor-move flex-col items-center justify-center gap-[16px]'>

                            <img className='max-h-[260px] px-[16px]' src={ SlideIcon1 } />

                            <div className='text-center text-[18px] text-base-text'>

                                {
                                    T('Splash.Slide1Header')
                                }

                            </div>

                            <div className='mx-[16px] text-center text-[14px] leading-[20px] text-base-text/75'>

                                {
                                    T('Splash.Slide1Text')
                                }

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide style={ { height: '100%', display: 'flex', justifyContent: 'center' } }>

                        <div className='flex cursor-move flex-col items-center justify-center gap-[16px]'>

                            <img className='max-h-[260px] px-[16px]' src={ SlideIcon2 } />

                            <div className='text-center text-[18px] text-base-text'>

                                {
                                    T('Splash.Slide2Header')
                                }

                            </div>

                            <div className='mx-[16px] text-center text-[14px] leading-[20px] text-base-text/75'>

                                {
                                    T('Splash.Slide2Text')
                                }

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide style={ { height: '100%', display: 'flex', justifyContent: 'center' } }>

                        <div className='flex cursor-move flex-col items-center justify-center gap-[16px]'>

                            <img className='max-h-[260px] px-[16px]' src={ SlideIcon3 } />

                            <div className='text-center text-[18px] text-base-text'>

                                {
                                    T('Splash.Slide3Header')
                                }

                            </div>

                            <div className='mx-[16px] text-center text-[14px] leading-[20px] text-base-text/75'>

                                {
                                    T('Splash.Slide3Text')
                                }

                            </div>

                        </div>

                    </SwiperSlide>

                </Swiper>

                <div className='my-[8px] flex justify-center gap-2'>

                    <button
                        className={ `size-[8px] cursor-pointer rounded-[2px] outline-base-outline ${ ActiveIndex === 0 ? 'bg-primary/75' : 'bg-base-secondary' }` }
                        onClick={ () => SwiperRef.current?.slideTo(0) } />

                    <button
                        className={ `size-[8px] cursor-pointer rounded-[2px] outline-base-outline ${ ActiveIndex === 1 ? 'bg-primary/75' : 'bg-base-secondary' }` }
                        onClick={ () => SwiperRef.current?.slideTo(1) } />

                    <button
                        className={ `size-[8px] cursor-pointer rounded-[2px] outline-base-outline ${ ActiveIndex === 2 ? 'bg-primary/75' : 'bg-base-secondary' }` }
                        onClick={ () => SwiperRef.current?.slideTo(2) } />

                </div>

            </div>

            <button
                className='mx-[16px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-primary-border bg-primary text-[16px] text-primary-text outline-primary-outline duration-200 hover:bg-primary-hover'
                onClick={ () => { Context.OpenModal(PasscodeModal); } }>

                {
                    T('Splash.Create')
                }

            </button>

            <button
                className='mx-[16px] my-[8px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-base-border text-[14px] text-base-text/75 outline-base-outline duration-200 hover:bg-base-secondary hover:text-base-text'
                onClick={ () => { Context.OpenModal(MenuModal); } }>

                {
                    T('Splash.Import')
                }

            </button>

            <div className='m-[8px] text-center text-[12px] text-base-text/25'>

                {
                    T('Splash.Version', Package.version)
                }

            </div>

        </div>);
}
