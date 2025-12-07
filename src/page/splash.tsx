import type { SwiperClass } from 'swiper/react';

import { useRef, useState } from 'react';
import { GrLanguage } from 'react-icons/gr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiPaintBrushHousehold } from 'react-icons/pi';

import LanguageModal from '../components/modal/language';

import Context from '../utility/context';
import Utility from '../utility/utility';

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

    const OnClickLanguage = () =>
    {
        Context.OpenModal(<LanguageModal ID={ Date.now() } />);
    };

    return (
        <div className='flex min-h-[668px] min-w-[360px] flex-col bg-content'>

            <div className='flex w-full justify-between p-[16px]'>

                <button
                    className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-content-border outline-content-outline duration-200 hover:bg-content-hover'
                    onClick={ OnClickLanguage }
                    tabIndex={ 1 }>

                    <GrLanguage className='m-[8px] size-[24px] text-content-text/75 duration-200 group-hover:text-content-text' />

                    <div className='h-full w-[1px] bg-content-border' />

                    <div className='px-[8px] text-[12px] font-bold text-content-text/75 duration-200 group-hover:text-content-text'>

                        {
                            T('Splash.Language')
                        }

                    </div>

                </button>

                <button
                    className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-content-border outline-content-outline duration-200 hover:bg-content-hover'
                    onClick={ Utility.GenerateTheme }
                    tabIndex={ 2 }>

                    <PiPaintBrushHousehold className='m-[8px] size-[24px] text-content-text/75 duration-200 group-hover:text-content-text' />

                </button>

            </div>

            <div className='flex w-screen flex-1 flex-col'>

                <Swiper
                    onSlideChange={ (swiper) => { SetActiveIndex(swiper.activeIndex); } }
                    onSwiper={ (swiper) => SwiperRef.current = swiper }
                    style={ { display: 'flex', width: '100%', flex: '1' } }>

                    <SwiperSlide style={ { display: 'flex' } }>

                        <div className='flex cursor-move flex-col justify-center gap-[16px]'>

                            <img className='px-[16px]' src={ SlideIcon1 } />

                            <div className='text-center text-[18px] font-bold text-content-text'>

                                {
                                    T('Splash.Slide1Header')
                                }

                            </div>

                            <div className='mx-[16px] flex text-center text-[14px] font-bold text-content-text/75'>

                                {
                                    T('Splash.Slide1Text')
                                }

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide style={ { display: 'flex' } }>

                        <div className='flex cursor-move flex-col justify-center gap-[16px]'>

                            <img className='px-[16px]' src={ SlideIcon2 } />

                            <div className='text-center text-[18px] font-bold text-content-text'>

                                {
                                    T('Splash.Slide1Header')
                                }

                            </div>

                            <div className='mx-[16px] flex text-center text-[14px] font-bold text-content-text/75'>

                                {
                                    T('Splash.Slide1Text')
                                }

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide style={ { display: 'flex' } }>

                        <div className='flex cursor-move flex-col justify-center gap-[16px]'>

                            <img className='px-[16px]' src={ SlideIcon3 } />

                            <div className='text-center text-[18px] font-bold text-content-text'>

                                {
                                    T('Splash.Slide1Header')
                                }

                            </div>

                            <div className='mx-[16px] flex text-center text-[14px] font-bold text-content-text/75'>

                                {
                                    T('Splash.Slide1Text')
                                }

                            </div>

                        </div>

                    </SwiperSlide>

                </Swiper>

                <div className='my-[8px] flex justify-center gap-2'>

                    <button
                        className={ `size-[8px] cursor-pointer rounded-[2px] outline-content-outline ${ ActiveIndex === 0 ? 'bg-primary/75' : 'bg-content-border' }` }
                        onClick={ () => SwiperRef.current?.slideTo(0) }
                        tabIndex={ 3 } />

                    <button
                        className={ `size-[8px] cursor-pointer rounded-[2px] outline-content-outline ${ ActiveIndex === 1 ? 'bg-primary/75' : 'bg-content-border' }` }
                        onClick={ () => SwiperRef.current?.slideTo(1) }
                        tabIndex={ 4 } />

                    <button
                        className={ `size-[8px] cursor-pointer rounded-[2px] outline-content-outline ${ ActiveIndex === 2 ? 'bg-primary/75' : 'bg-content-border' }` }
                        onClick={ () => SwiperRef.current?.slideTo(2) }
                        tabIndex={ 5 } />

                </div>

            </div>

            <button
                className='mx-[16px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-primary-border bg-primary text-[16px] font-bold text-primary-text outline-primary-outline duration-200 hover:bg-primary-hover'
                tabIndex={ 6 }>

                {
                    T('Splash.Create')
                }

            </button>

            <button
                className='mx-[16px] my-[8px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-content-border text-[14px] font-bold text-content-text/75 outline-content-outline duration-200 hover:bg-content-hover hover:text-content-text'
                tabIndex={ 7 }>

                {
                    T('Splash.Import')
                }

            </button>

            <div className='m-[8px] text-center text-[12px] text-content-text/25'>

                {
                    T('Splash.Version', Package.version)
                }

            </div>

        </div>);
}
