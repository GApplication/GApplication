import { MdClose, MdErrorOutline } from 'react-icons/md';

import { ModalClose } from '../../service/modal';

export default function Language({ ID, Message }: { readonly ID?: number; readonly Message: string })
{
    const OnClickClose = () =>
    {
        ModalClose(ID ?? 0);
    };

    return <div className='flex justify-center items-center w-screen h-screen bg-black/50 pointer-events-auto'>

        <div className='bg-content justify-center items-center flex p-[8px] rounded-[8px]'>

            <MdErrorOutline className='min-w-[24px] min-h-[24px] text-yellow-500' />

            <div className='w-full text-yellow-800 text-ellipsis overflow-hidden'>

                {
                    Message
                }

            </div>

            <MdClose
                className='min-w-[24px] min-h-[24px] p-[3px] cursor-pointer text-black transition bg-yellow-200/25 hover:bg-yellow-200/50 hover:text-black rounded-[8px]'
                onClick={ OnClickClose } />

        </div>

    </div>;
}
