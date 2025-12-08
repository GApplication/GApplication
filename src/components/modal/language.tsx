import { useState } from 'react';
import { motion } from 'motion/react';
import { MdClose } from 'react-icons/md';

import Context from '../../utility/context';

import Language, { T } from '../../utility/language';

export default function LanguageModal({ ID }: { readonly ID: number })
{
    const [ IsClose, SetIsClose ] = useState(false);

    const OnClickClose = () =>
    {
        SetIsClose(true);

        setTimeout(() =>
        {
            Context.CloseModal(ID);
        }, 250);
    };

    const OnClickLanguage = (Lang: LanguageType) =>
    {
        OnClickClose();

        void Language.SetLang(Lang);

        setTimeout(() =>
        {
            window.location.reload();
        }, 250);
    };

    return <motion.div
        animate={ { opacity: IsClose ? 0 : 1 } }
        className='pointer-events-auto flex h-full flex-1 items-center justify-center bg-content-reverse/50'
        exit={ { opacity: 0 } }
        initial={ { opacity: 0 } }
        transition={ { duration: 0.2 } }>

        <div className='flex max-h-[650px] min-w-[324px] flex-col rounded-[4px] bg-content'>

            <div className='flex h-[40px] items-center gap-[16px] border-b border-content-border p-[8px]'>

                <input
                    className='h-[24px] flex-1 rounded-[4px] bg-content-hover px-[8px] text-[12px] outline-content-outline'
                    placeholder='Search Language'
                    tabIndex={ 0 } />

                <MdClose
                    className='size-[24px] cursor-pointer rounded-[8px] text-content-text/25 outline-content-outline duration-200 hover:bg-content-hover hover:text-content-text/50'
                    onClick={ OnClickClose }
                    tabIndex={ 0 } />

            </div>

            <div className='my-[8px] flex flex-col gap-[8px] overflow-y-auto bg-amber-100 px-[8px]'>

                {
                    Language.Language.map((I) => <div
                        className='hover:bg-box flex min-h-[32px] cursor-pointer items-center gap-[8px] rounded-[8px] bg-content-hover p-[8px]'
                        key={ I.Code }
                        onClick={ () => { OnClickLanguage(I.Code); } }>

                        <div className={ `fi fi-${ I.Country } size-[24px]` } />

                        {
                            T(`Language.${ I.Code }`)
                        }

                    </div>)
                }

            </div>

        </div>

    </motion.div>;
}
