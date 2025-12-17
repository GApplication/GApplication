import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { MdClose } from 'react-icons/md';

import PasscodeModal from './passcode.modal';

import Context from '../../utility/context';

import { T } from '../../utility/language';

import WordList from '../../assets/wordlist.json';

const PhraseKey = Array.from({ length: 12 }, (_, I) => String(I + 1) as PhraseKey);
const PhraseMap = Object.fromEntries(PhraseKey.map((K) => [ K, { Word: '', Error: false } ])) as Record<PhraseKey, { Word: string; Error: boolean }>;

/**
 * IsValidWord - Checks whether a mnemonic word is valid or empty
 * @param {string} W - The word to validate
 * @returns {boolean} True if the word is empty or exists in the wordlist
 */
const IsValidWord = (W: string) => W === '' || WordList.includes(W);

export default function WalletModal({ ID }: Readonly<{ ID: number }>)
{
    const InputMap = useRef<Record<PhraseKey, HTMLInputElement>>({} as Record<PhraseKey, HTMLInputElement>);

    const [ IsClose, SetIsClose ] = useState(false);
    const [ Phrase, SetPhrase ] = useState(PhraseMap);

    /**
     * OnClickContinue - Validates the entered phrase and proceeds to passcode entry
     */
    const OnClickContinue = () =>
    {
        const InvalidKey = PhraseKey.find((Key) => Phrase[Key].Word === '' || !IsValidWord(Phrase[Key].Word));

        if (InvalidKey !== undefined)
        {
            SetPhrase((P) =>
            {
                InputMap.current[PhraseKey[PhraseKey.indexOf(InvalidKey)]]?.focus();

                return { ...P, [InvalidKey]: { Word: '', Error: true } };
            });

            return;
        }

        Context.CloseModal(ID);

        const RecoveryPhrase = PhraseKey.map((Key) => Phrase[Key].Word).join(' ');

        Context.OpenModal<{ Phrase: string }>(PasscodeModal, { Phrase: RecoveryPhrase });
    };

    /**
     * OnWordChange - Handles changes to individual mnemonic word inputs
     * @param {PhraseKey} Key - The positional key (1..12) of the word being edited
     * @param {string} Value - The new input value for the word
     */
    const OnWordChange = (Key: PhraseKey, Value: string) =>
    {
        const Word = Value.toLowerCase().trim().replaceAll(/\s+/g, '');

        SetPhrase((P) =>
        {
            const Next = { ...P, [Key]: { Word: Word, Error: !WordList.includes(Word) } };

            if (WordList.includes(Word))
            {
                const NextIndex = PhraseKey.indexOf(Key) + 1;
                const NextKey = PhraseKey[NextIndex];

                InputMap.current[NextKey]?.focus();
            }

            return Next;
        });
    };

    return <motion.div
        animate={ { y: IsClose ? '100%' : '0%' } }
        className='flex h-full w-full'
        initial={ { y: '100%' } }
        onAnimationComplete={ () => { if (IsClose) Context.CloseModal(ID); } }
        transition={ { duration: 0.2 } }>

        <div className='flex w-full flex-1 flex-col items-center bg-base'>

            <div className='h-[72px] w-full p-[16px]'>

                <button
                    className='group ml-auto flex h-[40px] cursor-pointer items-center rounded-[8px] border border-base-border outline-base-outline duration-200 hover:bg-base-secondary'
                    onClick={ () => { SetIsClose(true); } }>

                    <MdClose className='m-[8px] size-[24px] text-base-text/75 duration-200 group-hover:text-base-text' />

                </button>

            </div>

            <div className='flex flex-col items-center justify-center gap-[8px] px-[32px] text-center'>

                <div className='text-[16px] font-bold'>

                    {
                        T('Splash.WalletModal.Header')
                    }

                </div>

                <div className='text-base-text/50'>

                    {
                        T('Splash.WalletModal.Description')
                    }

                </div>

            </div>

            <div className='flex w-full flex-wrap justify-center gap-[8px] p-[16px]'>

                {
                    PhraseKey.map((Key) =>
                    {
                        const Input = Phrase[Key];

                        return (
                            <div
                                className={ `flex h-[40px] items-center rounded-[8px] border ${ Input.Error ? 'border-red-500' : 'border-base-border' }` }
                                key={ Key }>

                                <div className='w-[40px] text-center text-[14px] text-base-text/50'>

                                    {
                                        Key
                                    }

                                </div>

                                <div className={ `h-full w-[1px] ${ Input.Error ? 'bg-red-500' : 'bg-base-border' }` } />

                                <input
                                    className='h-full w-[116px] text-center outline-0'
                                    onChange={ (E) => OnWordChange(Key, E.target.value) }
                                    placeholder='...'
                                    ref={ (R) => { if (R) InputMap.current[Key] = R; } }
                                    value={ Input.Word } />

                            </div>
                        );
                    })
                }

            </div>

            <button
                className='cursor-pointer rounded-[8px] border border-base-border bg-primary px-[32px] py-[16px] text-[16px] text-primary-text outline-base-outline duration-200 hover:bg-primary-hover'
                onClick={ OnClickContinue }>

                {
                    T('Splash.WalletModal.Continue')
                }

            </button>

        </div>

    </motion.div>;
}
