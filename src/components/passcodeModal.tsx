import { useState } from 'react';
import { motion } from 'motion/react';
import { MdClose } from 'react-icons/md';

import Context from '../utility/context';
import Language from '../utility/language';

import { T } from '../utility/language';

export default function PasscodeModal({ ID = 0 }: { readonly ID: number })
{
    const [ IsClose, SetIsClose ] = useState(false);

