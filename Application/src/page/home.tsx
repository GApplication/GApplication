import { GrLanguage } from 'react-icons/gr';
import { PiPaintBrushHousehold } from 'react-icons/pi';

import NavigationComponent from '../components/home/navigation';

import { T } from '../utility/language';

export default function HomePage()
{
    return (
        <div className='relative flex h-full w-full flex-col items-center justify-center bg-base'>

            <iframe
                className='h-full w-full border-0'
                referrerPolicy='no-referrer'
                sandbox='allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-same-origin'
                src='https://guardian-service.ir' />

            <NavigationComponent />

        </div>);
}
