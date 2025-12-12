import { useState } from 'react';
import { motion } from 'motion/react';
import { MdClose } from 'react-icons/md';

import Context from '../../utility/context';
import Language from '../../utility/language';

import { T } from '../../utility/language';

export default function LanguageModal({ ID }: { readonly ID: number })
{
    const [ IsClose, SetIsClose ] = useState(false);

    const OnClickLanguage = async(Lang: LanguageType) =>
    {
        SetIsClose(true);

        await Language.SetLang(Lang);

        window.location.reload();
    };

    return <motion.div
        animate={ { opacity: IsClose ? 0 : 1 } }
        className='pointer-events-auto flex h-full flex-1 items-center justify-center bg-base-reverse/50'
        exit={ { opacity: 0 } }
        initial={ { opacity: 0 } }
        onAnimationComplete={ () => { if (IsClose) Context.CloseModal(ID); } }
        transition={ { duration: 0.2 } }>

        <div className='flex max-h-[650px] min-w-[324px] flex-col gap-[8px] rounded-[4px] bg-base'>

            <div className='flex h-[40px] items-center gap-[16px] border-b border-base-border p-[8px]'>

                <div className='flex-1 text-[14px] text-base-text'>

                    {
                        T('Language.Header')
                    }

                </div>

                <button
                    className='cursor-pointer rounded-[8px] text-base-text/25 outline-base-outline duration-200 hover:bg-base-secondary hover:text-base-text/50'
                    onClick={ () => { SetIsClose(true); } }>

                    <MdClose className='size-[24px]' />

                </button>

            </div>

            <div className='mb-[8px] flex max-h-[328px] flex-col gap-[8px] overflow-y-auto px-[8px]'>

                {
                    Language.Language.map((I) =>

                        <button
                            className='flex h-[40px] cursor-pointer items-center gap-[8px] rounded-[8px] border border-base-border p-[8px] text-base-text outline-base-outline duration-200 hover:bg-base-secondary'
                            key={ I.Code }
                            onClick={ () => { void OnClickLanguage(I.Code); } }>

                            <div className={ `fi fi-${ I.Country } size-[24px]` } />

                            {
                                T(`Language.${ I.Code }`)
                            }

                        </button>

                    )
                }

            </div>

        </div>

    </motion.div>;
}
