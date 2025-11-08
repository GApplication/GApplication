import { useEffect } from 'react';
import { MdClose, MdErrorOutline } from 'react-icons/md';

import { ToastClose } from '../../service/toast';

export default function Warning({ ID, Delay, Message }: { readonly ID?: number; readonly Delay?: number; readonly Message: string })
{
    const OnClickClose = () =>
    {
        ToastClose(ID ?? 0);
    };

    useEffect(() =>
    {
        const T = setTimeout(() => OnClickClose(), Delay);

        return () =>
        {
            clearTimeout(T);
        };
    }, [ ]);

    return <div className="flex w-[328px] h-[58px] mt-[16px] rounded-[8px] items-center gap-[8px] p-[8px] bg-yellow-50 border border-yellow-300 pointer-events-auto">

        <MdErrorOutline className="min-w-[24px] min-h-[24px] text-yellow-500" />

        <div className="w-full text-yellow-800 text-ellipsis overflow-hidden">

            {
                Message
            }

        </div>

        <MdClose
            className="min-w-[24px] min-h-[24px] p-[3px] cursor-pointer text-black transition bg-yellow-200/25 hover:bg-yellow-200/50 hover:text-black rounded-[8px]"
            onClick={ OnClickClose } />

    </div>;
}
