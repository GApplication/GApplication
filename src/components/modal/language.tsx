import { MdClose } from 'react-icons/md';

import { ModalClose } from '../../service/modal';

import LanguageUtility, { T } from '../../utility/language';

export default function Language({ ID }: { readonly ID?: number })
{
    const OnClickClose = () =>
    {
        ModalClose(ID ?? 0);
    };

    const OnClickLanguage = (Lang: LanguageType) =>
    {
        void LanguageUtility.SetLang(Lang);

        window.location.reload();
    };

    return <div className='flex justify-center items-center w-screen h-screen bg-black/50 pointer-events-auto'>

        <div className='flex flex-col bg-content w-[324px] h-[300px] rounded-[8px]'>

            <div className='flex p-[8px] items-center'>

                <div className='flex-1 '>

                    {
                        T('Modal.Language')
                    }

                </div>

                <MdClose
                    className='min-w-[24px] min-h-[24px] p-[3px] cursor-pointer text-black transition rounded-[8px] hover:bg-box/50'
                    onClick={ OnClickClose } />

            </div>

            <div className='border-b border-b-border/25' />

            <div className='w-full h-[8px]' />

            <div className='w-full overflow-y-scroll h-full flex flex-col gap-[8px] px-[8px]'>

                {
                    LanguageUtility.Language.map((I) => <div
                        className='flex min-h-[32px] bg-box/50 rounded-[8px] hover:bg-box cursor-pointer items-center gap-[8px] p-[8px]'
                        key={ I.Code }
                        onClick={ () => OnClickLanguage(I.Code) }>

                        <div className={ `fi fi-${ I.Country } size-[24px]` } />

                        {
                            T(`Language.${ I.Code }`)
                        }

                    </div>)
                }

            </div>

            <div className='w-full h-[8px]' />

        </div>

    </div>;
}
