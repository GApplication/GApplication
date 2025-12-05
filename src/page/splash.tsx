import type { SwiperClass } from 'swiper/react';

import { useRef, useState } from 'react';
import { GrLanguage } from 'react-icons/gr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiPaintBrushHousehold } from 'react-icons/pi';

import Utility from '../utility/utility';

import { T } from '../utility/language';

import Package from '../../package.json';
import SlideIcon1 from '../assets/image/splash-slide-1.png';
import SlideIcon2 from '../assets/image/splash-slide-1.png';
import SlideIcon3 from '../assets/image/splash-slide-1.png';

import 'swiper/css';

const OnClickTheme = () =>
{
    const L = Utility.Random(70, 92);
    const C = Utility.Random(0.03, 0.12);
    const H = Utility.Random(0, 360);

    const Content = { L: L, C: C, H: H };
    const ContentText = { L: (L > 70 ? 15 : 95), C: 0, H };
    const ContentHover = { L: Utility.Clamp(L + (L > 60 ? -8 : 8), 0, 100), C, H };
    const ContentBorder = { L: Utility.Clamp(L - 12, 0, 100), C: C * 0.4, H };

    document.documentElement.style.setProperty('--color-content', `oklch(${ Content.L }% ${ Content.C } ${ Content.H })`);
    document.documentElement.style.setProperty('--color-content-text', `oklch(${ ContentText.L }% ${ ContentText.C } ${ ContentText.H })`);
    document.documentElement.style.setProperty('--color-content-hover', `oklch(${ ContentHover.L }% ${ ContentHover.C } ${ ContentHover.H })`);
    document.documentElement.style.setProperty('--color-content-border', `oklch(${ ContentBorder.L }% ${ ContentBorder.C } ${ ContentBorder.H })`);
};

export default function SplashPage()
{
    const SwiperRef = useRef<SwiperClass>(undefined);

    const [ ActiveIndex, SetActiveIndex ] = useState(0);

    return (
        <div className='flex min-h-[668px] min-w-[360px] flex-col bg-content'>

            <div className='flex w-full justify-between p-[16px]'>

                <div className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-content-border duration-200 hover:bg-content-hover'>

                    <GrLanguage className='m-[8px] size-[24px] text-content-text/75 duration-200 group-hover:text-content-text' />

                    <div className='h-full w-[1px] bg-content-border' />

                    <div className='px-[8px] text-[12px] font-bold text-content-text/75 duration-200 group-hover:text-content-text'>

                        {
                            T('Splash.Language')
                        }

                    </div>

                </div>

                <div
                    onClick={ OnClickTheme }
                    className='group flex h-[40px] cursor-pointer items-center rounded-[8px] border border-content-border duration-200 hover:bg-content-hover'>

                    <PiPaintBrushHousehold className='m-[8px] size-[24px] text-content-text/75 duration-200 group-hover:text-content-text' />

                </div>

            </div>

            <div className='flex w-screen flex-1 flex-col'>

                <Swiper
                    style={ { display: 'flex', width: '100%', flex: '1' } }
                    onSwiper={ (swiper) => SwiperRef.current = swiper }
                    onSlideChange={ (swiper) => { SetActiveIndex(swiper.activeIndex); } }>

                    <SwiperSlide style={ { display: 'flex' } }>

                        <div className='flex cursor-move flex-col justify-center gap-[16px]'>

                            <img src={ SlideIcon1 } className='px-[16px]' />

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

                            <img src={ SlideIcon2 } className='px-[16px]' />

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

                            <img src={ SlideIcon3 } className='px-[16px]' />

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

                    <div onClick={ () => SwiperRef.current?.slideTo(0) } className={ `size-[8px] rounded-[2px] cursor-pointer ${ ActiveIndex === 0 ? 'bg-primary/75' : 'bg-content-border' }` } />

                    <div onClick={ () => SwiperRef.current?.slideTo(1) } className={ `size-[8px] rounded-[2px] cursor-pointer ${ ActiveIndex === 1 ? 'bg-primary/75' : 'bg-content-border' }` } />

                    <div onClick={ () => SwiperRef.current?.slideTo(2) } className={ `size-[8px] rounded-[2px] cursor-pointer ${ ActiveIndex === 2 ? 'bg-primary/75' : 'bg-content-border' }` } />

                </div>

            </div>

            <div className='mx-[16px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-primary-border bg-primary text-[16px] font-bold text-primary-text duration-200 hover:bg-primary-hover'>

                {
                    T('Splash.Create')
                }

            </div>

            <div className='mx-[16px] my-[8px] flex h-[48px] cursor-pointer items-center justify-center rounded-[8px] border border-content-border text-[14px] font-bold text-content-text/75 duration-200 hover:bg-content-hover hover:text-content-text'>

                {
                    T('Splash.Import')
                }

            </div>

            <div className='m-[8px] text-center text-[12px] text-content-text/25'>

                {
                    T('Splash.Version', Package.version)
                }

            </div>

        </div>);
}
